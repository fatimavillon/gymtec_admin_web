from fastapi import APIRouter

router = APIRouter()


@router.get("/metrics")
def get_model_metrics():
    return {
        "models": [
            {
                "name": "rf01_aforo_baseline",
                "type": "Random Forest",
                "status": "available",
                "metric_name": "confidence",
                "metric_value": 84,
            },
            {
                "name": "rf02_recomendador_score",
                "type": "Random Forest Recommender",
                "status": "available",
                "metric_name": "confidence",
                "metric_value": 89,
            },
        ],
    }