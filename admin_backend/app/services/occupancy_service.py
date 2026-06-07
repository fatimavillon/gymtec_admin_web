from datetime import date
from typing import Literal
from app.schemas.admin import (
    HourlyOccupancyItem, HourlyOccupancyResponse,
    HeatmapItem, WeeklyHeatmapResponse,
)
from app.services.data_loader import load_predicciones_aforo, load_aforo_por_slot

DAYS  = ["L", "M", "X", "J", "V", "S"]
HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

MOCK_HOURLY_RAW = [
    ("09:00", 32), ("10:00", 45), ("11:00", 58), ("12:00", 72),
    ("13:00", 85), ("14:00", 78), ("15:00", 35), ("16:00", 40),
    ("17:00", 55), ("18:00", 68), ("19:00", 74), ("20:00", 50),
]

MOCK_GRID: dict[str, list[int]] = {
    "L": [32, 45, 58, 72, 85, 78, 35, 40, 55, 68],
    "M": [28, 40, 62, 68, 80, 70, 38, 42, 60, 72],
    "X": [30, 42, 55, 65, 82, 75, 30, 38, 58, 65],
    "J": [35, 48, 60, 70, 88, 80, 40, 45, 62, 70],
    "V": [25, 38, 50, 60, 75, 65, 28, 35, 50, 60],
    "S": [20, 30, 40, 50, 60, 55, 25, 30, 42, 52],
}


def _level(occ: int) -> Literal["Bajo", "Medio", "Alto", "Crítico"]:
    if occ <= 50: return "Bajo"
    if occ <= 75: return "Medio"
    if occ <= 90: return "Alto"
    return "Crítico"


def get_hourly_occupancy() -> HourlyOccupancyResponse:
    items = [
        HourlyOccupancyItem(hour=h, occupancy=o, level=_level(o), ratio=round(o / 100, 2))
        for h, o in MOCK_HOURLY_RAW
    ]
    return HourlyOccupancyResponse(date=str(date.today()), source="mock", items=items)


def get_weekly_heatmap() -> WeeklyHeatmapResponse:
    items = [
        HeatmapItem(day=day, hour=hour, occupancy=MOCK_GRID[day][i], level=_level(MOCK_GRID[day][i]))
        for day in DAYS
        for i, hour in enumerate(HOURS)
    ]
    return WeeklyHeatmapResponse(days=DAYS, hours=HOURS, items=items)


def get_real_heatmap() -> WeeklyHeatmapResponse:
    df = load_aforo_por_slot()
    if df is not None and not df.empty:
        # Map real data → heatmap if columns are compatible
        try:
            items = []
            day_col  = next((c for c in ["dia_semana", "day", "dia"] if c in df.columns), None)
            hour_col = next((c for c in ["hora", "hour", "slot"] if c in df.columns), None)
            occ_col  = next((c for c in ["aforo", "ocupacion", "ratio", "count"] if c in df.columns), None)

            if day_col and hour_col and occ_col:
                for _, row in df.iterrows():
                    occ = int(row[occ_col] * 100 if row[occ_col] <= 1 else row[occ_col])
                    items.append(HeatmapItem(
                        day=str(row[day_col])[:1].upper(),
                        hour=str(row[hour_col])[:2],
                        occupancy=occ,
                        level=_level(occ),
                    ))
                return WeeklyHeatmapResponse(days=DAYS, hours=HOURS, items=items)
        except Exception:
            pass
    return get_weekly_heatmap()