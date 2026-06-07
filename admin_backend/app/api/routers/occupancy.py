from fastapi import APIRouter
from app.schemas.admin import HourlyOccupancyResponse, WeeklyHeatmapResponse
from app.services.occupancy_service import (
    get_hourly_occupancy,
    get_weekly_heatmap,
    get_real_heatmap,
)

router = APIRouter()


@router.get("/occupancy/hourly", response_model=HourlyOccupancyResponse)
def occupancy_hourly():
    """Predicción de aforo por franja horaria para el día actual."""
    return get_hourly_occupancy()


@router.get("/occupancy/weekly-heatmap", response_model=WeeklyHeatmapResponse)
def occupancy_weekly_heatmap():
    """Heatmap semanal de predicción de aforo (mock o procesado)."""
    return get_weekly_heatmap()


@router.get("/occupancy/heatmap-real", response_model=WeeklyHeatmapResponse)
def occupancy_heatmap_real():
    """Heatmap semanal calculado desde aforo_por_slot.parquet real."""
    return get_real_heatmap()