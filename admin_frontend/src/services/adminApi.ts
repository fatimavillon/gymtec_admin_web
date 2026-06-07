import { apiGet, ApiError } from "@/services/api";
import type {
    ApiResult,
    HealthResponse,
    DashboardSummary,
    HourlyOccupancyResponse,
    WeeklyHeatmapResponse,
    RecommendationResponse,
    ModelMetricsResponse,
    DataStatus,
    DataSourcesResponse,
    AdminMetricsResponse,
} from "@/types/admin";
import {
    MOCK_HEALTH,
    MOCK_DASHBOARD,
    MOCK_HOURLY,
    MOCK_HEATMAP,
    MOCK_RECOMMENDATIONS,
    MOCK_MODELS,
    MOCK_DATA_STATUS,
    MOCK_DATA_SOURCES,
    MOCK_ADMIN_METRICS,
} from "@/data/mockAdminData";

async function withFallback<T>(
    fetcher: () => Promise<T>,
    fallback: T
): Promise<ApiResult<T>> {
    try {
        const data = await fetcher();
        return { data, source: "live" };
    } catch (err) {
        const message = err instanceof ApiError ? err.message : "Unknown error";
        return { data: fallback, source: "mock", error: message };
    }
}

export async function checkHealth(): Promise<ApiResult<HealthResponse>> {
    return withFallback(() => apiGet<HealthResponse>("/health"), MOCK_HEALTH);
}

export async function getDashboardSummary(): Promise<ApiResult<DashboardSummary>> {
    return withFallback(
        () => apiGet<DashboardSummary>("/api/dashboard/summary"),
        MOCK_DASHBOARD
    );
}

export async function getHourlyOccupancy(): Promise<ApiResult<HourlyOccupancyResponse>> {
    return withFallback(
        () => apiGet<HourlyOccupancyResponse>("/api/occupancy/hourly"),
        MOCK_HOURLY
    );
}

export async function getWeeklyHeatmap(): Promise<ApiResult<WeeklyHeatmapResponse>> {
    return withFallback(
        () => apiGet<WeeklyHeatmapResponse>("/api/occupancy/weekly-heatmap"),
        MOCK_HEATMAP
    );
}

export async function getRealHeatmap(): Promise<ApiResult<WeeklyHeatmapResponse>> {
    return withFallback(
        () => apiGet<WeeklyHeatmapResponse>("/api/occupancy/heatmap-real"),
        MOCK_HEATMAP
    );
}

export async function getTopRecommendations(): Promise<ApiResult<RecommendationResponse>> {
    return withFallback(
        () => apiGet<RecommendationResponse>("/api/recommendations/top-slots"),
        MOCK_RECOMMENDATIONS
    );
}

export async function getModelMetrics(): Promise<ApiResult<ModelMetricsResponse>> {
    return withFallback(
        () => apiGet<ModelMetricsResponse>("/api/models/metrics"),
        MOCK_MODELS
    );
}

export async function getDataStatus(): Promise<ApiResult<DataStatus>> {
    return withFallback(
        () => apiGet<DataStatus>("/api/data/status"),
        MOCK_DATA_STATUS
    );
}

export async function getDataSources(): Promise<ApiResult<DataSourcesResponse>> {
    return withFallback(
        () => apiGet<DataSourcesResponse>("/api/data/sources"),
        MOCK_DATA_SOURCES
    );
}

export async function getAdminMetrics(): Promise<ApiResult<AdminMetricsResponse>> {
    return withFallback(
        () => apiGet<AdminMetricsResponse>("/api/admin/metrics"),
        MOCK_ADMIN_METRICS
    );
}