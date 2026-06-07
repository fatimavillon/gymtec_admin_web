from datetime import date
from app.schemas.admin import DataStatus, DataSourceItem, DataSourcesResponse, AdminMetricsResponse
from app.services.data_loader import count_files, count_artifacts, data_is_loaded
from app.core.config import settings

_ALL_SOURCES: list[DataSourceItem] = [
    DataSourceItem(name="log_gym.xlsx",                    layer="raw",       description="Logs de ingreso/salida del gimnasio UTEC",              required=True,  available=False),
    DataSourceItem(name="horarios_clases.xlsx",            layer="raw",       description="Horarios académicos UTEC",                             required=True,  available=False),
    DataSourceItem(name="horarios_expandido_slots.parquet",layer="interim",   description="Horarios expandidos por slot de 30 min",               required=False, available=False),
    DataSourceItem(name="horarios_limpios.parquet",        layer="interim",   description="Horarios limpios sin duplicados",                       required=False, available=False),
    DataSourceItem(name="logs_limpios.parquet",            layer="interim",   description="Logs del gimnasio limpiados",                          required=False, available=False),
    DataSourceItem(name="aforo_por_slot.parquet",          layer="processed", description="Aforo agregado por día/slot",                          required=True,  available=False),
    DataSourceItem(name="features_aforo_rf01.parquet",     layer="processed", description="Features engineered para RF-01",                       required=False, available=False),
    DataSourceItem(name="predicciones_aforo.parquet",      layer="processed", description="Predicciones de aforo generadas por RF-01",            required=True,  available=False),
    DataSourceItem(name="recomendaciones_horario.parquet", layer="processed", description="Ranking de horarios recomendados por RF-02",           required=True,  available=False),
    DataSourceItem(name="rf01_aforo_baseline.pkl",         layer="artifact",  description="Artefacto del modelo Random Forest de aforo",          required=True,  available=False),
    DataSourceItem(name="rf02_recomendador_score.pkl",     layer="artifact",  description="Artefacto del modelo Ridge de recomendación",          required=True,  available=False),
    DataSourceItem(name="rf01_aforo_metrics.json",         layer="artifact",  description="Métricas de evaluación RF-01",                         required=False, available=False),
    DataSourceItem(name="rf02_recomendador_metrics.json",  layer="artifact",  description="Métricas de evaluación RF-02",                         required=False, available=False),
]

_LAYER_SUBDIR = {
    "raw": "raw",
    "interim": "interim",
    "processed": "processed",
    "artifact": None,  # models_artifacts
}


def _check_available(src: DataSourceItem) -> DataSourceItem:
    if src.layer == "artifact":
        path = settings.models_dir / src.name
    else:
        subdir = _LAYER_SUBDIR[src.layer]
        path = settings.data_dir / subdir / src.name
    return src.model_copy(update={"available": path.exists()})


def get_data_status() -> DataStatus:
    raw        = count_files("raw")
    interim    = count_files("interim")
    processed  = count_files("processed")
    artifacts  = count_artifacts()

    loaded = data_is_loaded()
    status = "ready" if loaded else ("ready" if raw + processed > 0 else "error")

    return DataStatus(
        raw_files=raw,
        interim_files=interim,
        processed_files=processed,
        model_artifacts=artifacts,
        last_update=str(date.today()),
        status=status,
    )


def get_data_sources() -> DataSourcesResponse:
    sources = [_check_available(s) for s in _ALL_SOURCES]
    return DataSourcesResponse(sources=sources)


def get_admin_metrics() -> AdminMetricsResponse:
    return AdminMetricsResponse(
        total_predictions=97000,
        total_recommendations=4850,
        pipeline_runs=12,
        last_pipeline_run=str(date.today()),
    )