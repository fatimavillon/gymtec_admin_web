export type OccupancyLevel = "Bajo" | "Medio" | "Alto" | "Cerrado";

export interface DashboardSummary {
    current_occupancy_level: OccupancyLevel;
    current_occupancy_value: number;
    best_training_hour: string;
    peak_hour: string;
    weekly_confidence: number;
    students_impacted: number;
    data_source: string;
}

export interface HourlyOccupancyItem {
    hour: string;
    occupancy: number;
    level: OccupancyLevel;
}

export interface HourlyOccupancyResponse {
    date: string;
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

export interface RecommendationSlot {
    rank: number;
    start_time: string;
    end_time: string;
    score: number;
    level: OccupancyLevel;
    reason: string;
}

export interface RecommendationResponse {
    items: RecommendationSlot[];
}

export interface ModelMetric {
    name: string;
    type: string;
    status: "available" | "unavailable" | "training";
    metric_name: string;
    metric_value: number;
}

export interface ModelMetricsResponse {
    models: ModelMetric[];
}

export interface DataStatus {
    raw_files: number;
    processed_files: number;
    model_artifacts: number;
    last_update: string;
    status: "ready" | "processing" | "error";
}

export interface HealthStatus {
    status: string;
    version?: string;
    timestamp?: string;
}