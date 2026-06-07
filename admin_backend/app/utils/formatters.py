from typing import Literal

OccupancyLevel = Literal["Bajo", "Medio", "Alto", "Crítico", "Cerrado"]


def ratio_to_level(ratio: float) -> OccupancyLevel:
    if ratio <= 0.50: return "Bajo"
    if ratio <= 0.75: return "Medio"
    if ratio <= 0.90: return "Alto"
    return "Crítico"


def occupancy_to_level(occupancy_pct: int) -> OccupancyLevel:
    return ratio_to_level(occupancy_pct / 100)


def format_hour(hour: int) -> str:
    return f"{hour:02d}:00"