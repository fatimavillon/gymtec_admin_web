from datetime import date
from app.schemas.admin import (
    DashboardSummary,
    HourlyOccupancyResponse,
    HourlyOccupancyItem,
    WeeklyHeatmapResponse,
    HeatmapItem,
    RecommendationResponse,
    RecommendationSlot,
    ModelMetricsResponse,
    ModelMetric,
    DataStatus,
)


def _level(occupancy: int) -> str:
    if occupancy < 40:
        return "Bajo"
    elif occupancy < 70:
        return "Medio"
    else:
        return "Alto"


def get_dashboard_summary() -> DashboardSummary:
    return DashboardSummary(
        current_occupancy_level="Medio",
        current_occupancy_value=62,
        best_training_hour="15:00",
        peak_hour="13:00",
        weekly_confidence=84,
        students_impacted=320,
        data_source="mock-admin",
    )


def get_hourly_occupancy() -> HourlyOccupancyResponse:
    raw = [
        ("09:00", 32), ("10:00", 45), ("11:00", 58), ("12:00", 72),
        ("13:00", 85), ("14:00", 78), ("15:00", 35), ("16:00", 40),
        ("17:00", 55), ("18:00", 68), ("19:00", 74), ("20:00", 50),
    ]
    items = [
        HourlyOccupancyItem(hour=h, occupancy=o, level=_level(o))
        for h, o in raw
    ]
    return HourlyOccupancyResponse(
        date=str(date.today()),
        items=items,
    )


def get_weekly_heatmap() -> WeeklyHeatmapResponse:
    days = ["L", "M", "X", "J", "V", "S"]
    hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

    data = {
        "L": [32, 45, 58, 72, 85, 78, 35, 40, 55, 68],
        "M": [28, 40, 62, 68, 80, 70, 38, 42, 60, 72],
        "X": [30, 42, 55, 65, 82, 75, 30, 38, 58, 65],
        "J": [35, 48, 60, 70, 88, 80, 40, 45, 62, 70],
        "V": [25, 38, 50, 60, 75, 65, 28, 35, 50, 60],
        "S": [20, 30, 40, 50, 60, 55, 25, 30, 42, 52],
    }

    items = []
    for day in days:
        for i, hour in enumerate(hours):
            occ = data[day][i]
            items.append(
                HeatmapItem(day=day, hour=hour, occupancy=occ, level=_level(occ))
            )

    return WeeklyHeatmapResponse(days=days, hours=hours, items=items)


def get_recommendations() -> RecommendationResponse:
    return RecommendationResponse(
        items=[
            RecommendationSlot(
                rank=1, start_time="15:00", end_time="16:00", score=89,
                level="Bajo", reason="Aforo bajo y menor cruce con clases."
            ),
            RecommendationSlot(
                rank=2, start_time="09:00", end_time="10:00", score=85,
                level="Bajo", reason="Franja matutina con baja demanda estimada."
            ),
            RecommendationSlot(
                rank=3, start_time="16:00", end_time="17:00", score=80,
                level="Bajo", reason="Post-almuerzo con menor actividad académica."
            ),
            RecommendationSlot(
                rank=4, start_time="20:00", end_time="21:00", score=75,
                level="Medio", reason="Franja nocturna con demanda moderada."
            ),
            RecommendationSlot(
                rank=5, start_time="10:00", end_time="11:00", score=70,
                level="Medio", reason="Mañana media con aforo moderado."
            ),
        ]
    )


def get_model_metrics() -> ModelMetricsResponse:
    return ModelMetricsResponse(
        models=[
            ModelMetric(
                name="rf01_aforo_baseline",
                type="Random Forest",
                status="available",
                metric_name="confidence",
                metric_value=84,
            ),
            ModelMetric(
                name="rf02_recomendador_score",
                type="Random Forest Recommender",
                status="available",
                metric_name="confidence",
                metric_value=89,
            ),
        ]
    )


def get_data_status() -> DataStatus:
    return DataStatus(
        raw_files=2,
        processed_files=5,
        model_artifacts=2,
        last_update=str(date.today()),
        status="ready",
    )