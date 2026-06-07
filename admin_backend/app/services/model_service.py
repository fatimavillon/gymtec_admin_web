from app.schemas.admin import ModelMetric, ModelMetricsResponse
from app.services.data_loader import load_model_metrics

MOCK_MODELS = [
    ModelMetric(
        name="rf01_aforo_baseline",
        type="Random Forest Regressor",
        status="available",
        metric_name="R²",
        metric_value=0.890,
        description="Predice el aforo del gimnasio por día y slot horario. MAE=2.63, RMSE=3.59.",
    ),
    ModelMetric(
        name="rf02_recomendador_score",
        type="Ridge Regressor",
        status="available",
        metric_name="NDCG@3",
        metric_value=0.998,
        description="Ordena y puntúa los mejores horarios recomendados. MAE=0.033, R²=0.927.",
    ),
]

MODEL_NAMES = ["rf01_aforo_baseline", "rf02_recomendador_score"]

_METRIC_MAP = {
    "r2": "R²", "r_squared": "R²",
    "ndcg": "NDCG@3", "ndcg_3": "NDCG@3",
    "mae": "MAE", "rmse": "RMSE",
}

_TYPE_MAP = {
    "rf01_aforo_baseline":     "Random Forest Regressor",
    "rf02_recomendador_score": "Ridge Regressor",
}

_DESC_MAP = {
    "rf01_aforo_baseline":     "Predice el aforo del gimnasio por día y slot horario. MAE=2.63, RMSE=3.59.",
    "rf02_recomendador_score": "Ordena y puntúa los mejores horarios recomendados. MAE=0.033, R²=0.927.",
}


def _parse_metric(metrics: dict) -> tuple[str, float]:
    """Return (metric_name, metric_value) from a metrics JSON."""
    for key in ("ndcg_3", "ndcg", "r2", "r_squared", "mae"):
        if key in metrics:
            return _METRIC_MAP.get(key, key.upper()), float(metrics[key])
    # fallback: first numeric value
    for k, v in metrics.items():
        try:
            return k.upper(), float(v)
        except (TypeError, ValueError):
            continue
    return "metric", 0.0


def get_model_metrics() -> ModelMetricsResponse:
    models: list[ModelMetric] = []

    for name in MODEL_NAMES:
        raw = load_model_metrics(name)
        if raw:
            try:
                metric_name, metric_value = _parse_metric(raw)
                models.append(ModelMetric(
                    name=name,
                    type=_TYPE_MAP.get(name, "ML Model"),
                    status="available",
                    metric_name=metric_name,
                    metric_value=metric_value,
                    description=_DESC_MAP.get(name, "Modelo de predicción."),
                ))
                continue
            except Exception:
                pass
        # fallback to mock for this model
        mock = next((m for m in MOCK_MODELS if m.name == name), None)
        if mock:
            models.append(mock)

    return ModelMetricsResponse(models=models if models else MOCK_MODELS)