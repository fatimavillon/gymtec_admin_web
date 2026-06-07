from fastapi import APIRouter
from app.schemas.admin import ModelMetricsResponse
from app.services.model_service import get_model_metrics

router = APIRouter()


@router.get("/models/metrics", response_model=ModelMetricsResponse)
def models_metrics():
    """Métricas y estado de los modelos ML del pipeline GYMTEC."""
    return get_model_metrics()