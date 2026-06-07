from fastapi import APIRouter
from app.schemas.admin import RecommendationResponse
from app.services.recommendation_service import get_top_recommendations

router = APIRouter()


@router.get("/recommendations/top-slots", response_model=RecommendationResponse)
def recommendations_top_slots():
    """Top horarios globales recomendados por el modelo RF-02."""
    return get_top_recommendations()