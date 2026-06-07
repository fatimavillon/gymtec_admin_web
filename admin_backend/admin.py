from fastapi import APIRouter
from app.services.admin_service import (
    get_dashboard_summary,
    get_hourly_occupancy,
    get_weekly_heatmap,
    get_recommendations,
    get_model_metrics,
    get_data_status,
)
from app.schemas.admin import (
    DashboardSummary,
    HourlyOccupancyResponse,
    WeeklyHeatmapResponse,
    RecommendationResponse,
    ModelMetricsResponse,
    DataStatus,
)

router = APIRouter()


@router.get("/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary():
    return get_dashboard_summary()


@router.get("/occupancy/hourly", response_model=HourlyOccupancyResponse)
def occupancy_hourly():
    return get_hourly_occupancy()


@router.get("/occupancy/weekly-heatmap", response_model=WeeklyHeatmapResponse)
def occupancy_weekly_heatmap():
    return get_weekly_heatmap()


@router.get("/recommendations/top-slots", response_model=RecommendationResponse)
def recommendations_top_slots():
    return get_recommendations()


@router.get("/models/metrics", response_model=ModelMetricsResponse)
def models_metrics():
    return get_model_metrics()


@router.get("/data/status", response_model=DataStatus)
def data_status():
    return get_data_status()