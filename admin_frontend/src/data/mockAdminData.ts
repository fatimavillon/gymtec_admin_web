import type {
    DashboardSummary,
    HourlyOccupancyResponse,
    WeeklyHeatmapResponse,
    RecommendationResponse,
    ModelMetricsResponse,
    DataStatus,
    DataSourcesResponse,
    AdminMetricsResponse,
    HealthResponse,
} from "@/types/admin";

export const MOCK_HEALTH: HealthResponse = {
    status: "ok",
    service: "gymtec-admin-backend",
    version: "0.1.0",
    data_loaded: true,
};

export const MOCK_DASHBOARD: DashboardSummary = {
    current_occupancy_level: "Medio",
    current_occupancy_value: 62,
    best_training_hour: "15:00",
    peak_hour: "13:00",
    weekly_confidence: 84,
    students_impacted: 320,
    data_source: "mock",
    last_update: new Date().toISOString().slice(0, 10),
};

export const MOCK_HOURLY: HourlyOccupancyResponse = {
    date: new Date().toISOString().slice(0, 10),
    source: "mock",
    items: [
        { hour: "09:00", occupancy: 32, level: "Bajo",   ratio: 0.32 },
        { hour: "10:00", occupancy: 45, level: "Bajo",   ratio: 0.45 },
        { hour: "11:00", occupancy: 58, level: "Medio",  ratio: 0.58 },
        { hour: "12:00", occupancy: 72, level: "Medio",  ratio: 0.72 },
        { hour: "13:00", occupancy: 85, level: "Alto",   ratio: 0.85 },
        { hour: "14:00", occupancy: 78, level: "Alto",   ratio: 0.78 },
        { hour: "15:00", occupancy: 35, level: "Bajo",   ratio: 0.35 },
        { hour: "16:00", occupancy: 40, level: "Bajo",   ratio: 0.40 },
        { hour: "17:00", occupancy: 55, level: "Medio",  ratio: 0.55 },
        { hour: "18:00", occupancy: 68, level: "Medio",  ratio: 0.68 },
        { hour: "19:00", occupancy: 74, level: "Medio",  ratio: 0.74 },
        { hour: "20:00", occupancy: 50, level: "Medio",  ratio: 0.50 },
    ],
};

const DAYS  = ["L", "M", "X", "J", "V", "S"];
const HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

const RAW_GRID: Record<string, number[]> = {
    L: [32, 45, 58, 72, 85, 78, 35, 40, 55, 68],
    M: [28, 40, 62, 68, 80, 70, 38, 42, 60, 72],
    X: [30, 42, 55, 65, 82, 75, 30, 38, 58, 65],
    J: [35, 48, 60, 70, 88, 80, 40, 45, 62, 70],
    V: [25, 38, 50, 60, 75, 65, 28, 35, 50, 60],
    S: [20, 30, 40, 50, 60, 55, 25, 30, 42, 52],
};

function toLevel(occ: number): "Bajo" | "Medio" | "Alto" | "Crítico" {
    if (occ <= 50) return "Bajo";
    if (occ <= 75) return "Medio";
    if (occ <= 90) return "Alto";
    return "Crítico";
}

export const MOCK_HEATMAP: WeeklyHeatmapResponse = {
    days: DAYS,
    hours: HOURS,
    items: DAYS.flatMap((day) =>
        HOURS.map((hour, i) => ({
            day,
            hour,
            occupancy: RAW_GRID[day][i],
            level: toLevel(RAW_GRID[day][i]),
        }))
    ),
};

export const MOCK_RECOMMENDATIONS: RecommendationResponse = {
    source: "mock",
    items: [
        { rank: 1, start_time: "15:00", end_time: "16:00", score: 89, level: "Bajo",  reason: "Aforo bajo y menor cruce con clases." },
        { rank: 2, start_time: "09:00", end_time: "10:00", score: 85, level: "Bajo",  reason: "Franja matutina con baja demanda estimada." },
        { rank: 3, start_time: "16:00", end_time: "17:00", score: 80, level: "Bajo",  reason: "Post-almuerzo con menor actividad académica." },
        { rank: 4, start_time: "20:00", end_time: "21:00", score: 75, level: "Medio", reason: "Franja nocturna con demanda moderada." },
        { rank: 5, start_time: "10:00", end_time: "11:00", score: 70, level: "Medio", reason: "Mañana media con aforo moderado." },
    ],
};

export const MOCK_MODELS: ModelMetricsResponse = {
    models: [
        {
            name:         "rf01_aforo_baseline",
            type:         "Random Forest Regressor",
            status:       "available",
            metric_name:  "R²",
            metric_value: 0.89,
            description:  "Predice el aforo del gimnasio por día y slot horario.",
        },
        {
            name:         "rf02_recomendador_score",
            type:         "Ridge Regressor",
            status:       "available",
            metric_name:  "NDCG@3",
            metric_value: 0.998,
            description:  "Ordena y puntúa los mejores horarios recomendados.",
        },
    ],
};

export const MOCK_DATA_STATUS: DataStatus = {
    raw_files:       2,
    interim_files:   3,
    processed_files: 6,
    model_artifacts: 4,
    last_update:     new Date().toISOString().slice(0, 10),
    status:          "ready",
};

export const MOCK_DATA_SOURCES: DataSourcesResponse = {
    sources: [
        { name: "log_gym.xlsx",                    layer: "raw",       description: "Logs de ingreso/salida del gimnasio UTEC",              required: true,  available: true },
        { name: "horarios_clases.xlsx",            layer: "raw",       description: "Horarios académicos UTEC",                             required: true,  available: true },
        { name: "horarios_expandido_slots.parquet",layer: "interim",   description: "Horarios expandidos por slot de 30 min",               required: false, available: true },
        { name: "logs_limpios.parquet",            layer: "interim",   description: "Logs del gimnasio limpiados",                          required: false, available: true },
        { name: "aforo_por_slot.parquet",          layer: "processed", description: "Aforo agregado por día/slot",                          required: true,  available: true },
        { name: "predicciones_aforo.parquet",      layer: "processed", description: "Predicciones de aforo generadas por RF-01",            required: true,  available: true },
        { name: "recomendaciones_horario.parquet", layer: "processed", description: "Ranking de horarios recomendados por RF-02",           required: true,  available: true },
        { name: "rf01_aforo_baseline.pkl",         layer: "artifact",  description: "Artefacto del modelo Random Forest de aforo",          required: true,  available: true },
        { name: "rf02_recomendador_score.pkl",     layer: "artifact",  description: "Artefacto del modelo Ridge de recomendación",          required: true,  available: true },
        { name: "rf01_aforo_metrics.json",         layer: "artifact",  description: "Métricas de evaluación RF-01 (MAE, RMSE, R²)",         required: false, available: true },
        { name: "rf02_recomendador_metrics.json",  layer: "artifact",  description: "Métricas de evaluación RF-02 (MAE, R², NDCG@3)",       required: false, available: true },
    ],
};

export const MOCK_ADMIN_METRICS: AdminMetricsResponse = {
    total_predictions:    97000,
    total_recommendations: 4850,
    pipeline_runs:        12,
    last_pipeline_run:    new Date().toISOString().slice(0, 10),
};