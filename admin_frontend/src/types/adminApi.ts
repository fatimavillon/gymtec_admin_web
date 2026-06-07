import type {
    DashboardSummary,
    HourlyOccupancyResponse,
    WeeklyHeatmapResponse,
    RecommendationResponse,
    ModelMetricsResponse,
    DataStatus,
    HealthStatus,
} from "@/types/admin";
import { API_FALLBACK_URL } from "@/lib/constants";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? API_FALLBACK_URL;

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText} — ${path}`);
    }
    return res.json() as Promise<T>;
}

export async function getHealth(): Promise<HealthStatus> {
    return apiFetch<HealthStatus>("/health");
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
    return apiFetch<DashboardSummary>("/api/dashboard/summary");
}

export async function getHourlyOccupancy(): Promise<HourlyOccupancyResponse> {
    return apiFetch<HourlyOccupancyResponse>("/api/occupancy/hourly");
}

export async function getWeeklyHeatmap(): Promise<WeeklyHeatmapResponse> {
    return apiFetch<WeeklyHeatmapResponse>("/api/occupancy/weekly-heatmap");
}

export async function getRecommendations(): Promise<RecommendationResponse> {
    return apiFetch<RecommendationResponse>("/api/recommendations/top-slots");
}

export async function getModelMetrics(): Promise<ModelMetricsResponse> {
    return apiFetch<ModelMetricsResponse>("/api/models/metrics");
}

export async function getDataStatus(): Promise<DataStatus> {
    return apiFetch<DataStatus>("/api/data/status");
}