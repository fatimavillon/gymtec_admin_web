from pydantic import BaseModel
from typing import List, Literal, Optional
from datetime import date as DateType

OccupancyLevel = Literal["Bajo", "Medio", "Alto", "Cerrado"]


class DashboardSummary(BaseModel):
    current_occupancy_level: OccupancyLevel
    current_occupancy_value: int
    best_training_hour: str
    peak_hour: str
    weekly_confidence: int
    students_impacted: int
    data_source: str


class HourlyOccupancyItem(BaseModel):
    hour: str
    occupancy: int
    level: OccupancyLevel


class HourlyOccupancyResponse(BaseModel):
    date: str
    items: List[HourlyOccupancyItem]


class HeatmapItem(BaseModel):
    day: str
    hour: str
    occupancy: int
    level: OccupancyLevel


class WeeklyHeatmapResponse(BaseModel):
    days: List[str]
    hours: List[str]
    items: List[HeatmapItem]


class RecommendationSlot(BaseModel):
    rank: int
    start_time: str
    end_time: str
    score: int
    level: OccupancyLevel
    reason: str


class RecommendationResponse(BaseModel):
    items: List[RecommendationSlot]


class ModelMetric(BaseModel):
    name: str
    type: str
    status: Literal["available", "unavailable", "training"]
    metric_name: str
    metric_value: int


class ModelMetricsResponse(BaseModel):
    models: List[ModelMetric]


class DataStatus(BaseModel):
    raw_files: int
    processed_files: int
    model_artifacts: int
    last_update: str
    status: Literal["ready", "processing", "error"]


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: Optional[str] = None