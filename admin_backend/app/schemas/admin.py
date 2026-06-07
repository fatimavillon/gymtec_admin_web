from __future__ import annotations
from typing import Literal, List, Optional
from pydantic import BaseModel

OccupancyLevel = Literal["Bajo", "Medio", "Alto", "Crítico", "Cerrado"]


# ─── Health ──────────────────────────────────────────────────────────────────

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    data_loaded: bool


# ─── Dashboard ───────────────────────────────────────────────────────────────

class DashboardSummary(BaseModel):
    current_occupancy_level: OccupancyLevel
    current_occupancy_value: int
    best_training_hour: str
    peak_hour: str
    weekly_confidence: int
    students_impacted: int
    data_source: str
    last_update: str


# ─── Occupancy ───────────────────────────────────────────────────────────────

class HourlyOccupancyItem(BaseModel):
    hour: str
    occupancy: int
    level: OccupancyLevel
    ratio: float


class HourlyOccupancyResponse(BaseModel):
    date: str
    source: str
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


# ─── Recommendations ─────────────────────────────────────────────────────────

class RecommendationSlot(BaseModel):
    rank: int
    start_time: str
    end_time: str
    score: int
    level: OccupancyLevel
    reason: str


class RecommendationResponse(BaseModel):
    source: str
    items: List[RecommendationSlot]


# ─── Models ──────────────────────────────────────────────────────────────────

class ModelMetric(BaseModel):
    name: str
    type: str
    status: Literal["available", "unavailable", "training"]
    metric_name: str
    metric_value: float
    description: str


class ModelMetricsResponse(BaseModel):
    models: List[ModelMetric]


# ─── Data Status ─────────────────────────────────────────────────────────────

class DataStatus(BaseModel):
    raw_files: int
    interim_files: int
    processed_files: int
    model_artifacts: int
    last_update: str
    status: Literal["ready", "processing", "error"]


class DataSourceItem(BaseModel):
    name: str
    layer: Literal["raw", "interim", "processed", "artifact"]
    description: str
    required: bool
    available: bool


class DataSourcesResponse(BaseModel):
    sources: List[DataSourceItem]


# ─── Admin metrics ───────────────────────────────────────────────────────────

class AdminMetricsResponse(BaseModel):
    total_predictions: int
    total_recommendations: int
    pipeline_runs: int
    last_pipeline_run: str