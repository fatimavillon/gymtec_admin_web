// ─── Occupancy ──────────────────────────────────────────────────────────────

export type OccupancyLevel = "Bajo" | "Medio" | "Alto" | "Crítico" | "Cerrado";

export type DataSource = "live" | "mock";

export interface ApiResult<T> {
    data: T;
    source: DataSource;
    error?: string;
}

// ─── Health ──────────────────────────────────────────────────────────────────

export interface HealthResponse {
    status: string;
    service: string;
    version: string;
    data_loaded: boolean;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardSummary {
    current_occupancy_level: OccupancyLevel;
    current_occupancy_value: number;
    best_training_hour: string;
    peak_hour: string;
    weekly_confidence: number;
    students_impacted: number;
    data_source: string;
    last_update: string;
}

// ─── Occupancy ───────────────────────────────────────────────────────────────

export interface HourlyOccupancyItem {
    hour: string;
    occupancy: number;
    level: OccupancyLevel;
    ratio: number;
}

export interface HourlyOccupancyResponse {
    date: string;
    source: string;
    items: HourlyOccupancyItem[];
}

export interface HeatmapItem {
    day: string;
    hour: string;
    occupancy: number;
    level: OccupancyLevel;
}

export interface WeeklyHeatmapResponse {
    days: string[];
    hours: string[];
    items: HeatmapItem[];
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export interface RecommendationSlot {
    rank: number;
    start_time: string;
    end_time: string;
    score: number;
    level: OccupancyLevel;
    reason: string;
}

export interface RecommendationResponse {
    source: string;
    items: RecommendationSlot[];
}

// ─── Models ──────────────────────────────────────────────────────────────────

export interface ModelMetric {
    name: string;
    type: string;
    status: "available" | "unavailable" | "training";
    metric_name: string;
    metric_value: number;
    description: string;
}

export interface ModelMetricsResponse {
    models: ModelMetric[];
}

// ─── Data Status ─────────────────────────────────────────────────────────────

export interface DataStatus {
    raw_files: number;
    interim_files: number;
    processed_files: number;
    model_artifacts: number;
    last_update: string;
    status: "ready" | "processing" | "error";
}

export interface DataSourceItem {
    name: string;
    layer: "raw" | "interim" | "processed" | "artifact";
    description: string;
    required: boolean;
    available: boolean;
}

export interface DataSourcesResponse {
    sources: DataSourceItem[];
}

// ─── Admin metrics ───────────────────────────────────────────────────────────

export interface AdminMetricsResponse {
    total_predictions: number;
    total_recommendations: number;
    pipeline_runs: number;
    last_pipeline_run: string;
}