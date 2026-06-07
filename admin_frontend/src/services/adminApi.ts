import {
    DashboardSummary,
    DataStatus,
    HourlyOccupancyResponse,
    ModelMetricsResponse,
    RecommendationResponse,
    WeeklyHeatmapResponse,
} from "@/types/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Error al consumir ${path}`);
    }

    return response.json();
}

export const adminApi = {
    getDashboardSummary: () =>
        apiGet<DashboardSummary>("/api/dashboard/summary"),

    getHourlyOccupancy: () =>
        apiGet<HourlyOccupancyResponse>("/api/occupancy/hourly"),

    getWeeklyHeatmap: () =>
        apiGet<WeeklyHeatmapResponse>("/api/occupancy/weekly-heatmap"),

    getRecommendations: () =>
        apiGet<RecommendationResponse>("/api/recommendations/top-slots"),

    getModelMetrics: () =>
        apiGet<ModelMetricsResponse>("/api/models/metrics"),

    getDataStatus: () =>
        apiGet<DataStatus>("/api/data/status"),
};