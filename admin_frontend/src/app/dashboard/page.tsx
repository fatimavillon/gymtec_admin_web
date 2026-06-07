import {
    getDashboardSummary,
    getHourlyOccupancy,
    getWeeklyHeatmap,
    getTopRecommendations,
} from "@/services/adminApi";
import { MetricCard }           from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge, SourceBadge } from "@/components/ui/Badge";
import { HourlyOccupancyChart } from "@/components/charts/HourlyOccupancyChart";
import { WeeklyHeatmap }        from "@/components/charts/WeeklyHeatmap";
import { RecommendationList }   from "@/components/cards/RecommendationList";
import { EmptyState }           from "@/components/ui/EmptyState";
import {
    Users, Activity, Clock, TrendingUp, BarChart2, Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const [summaryResult, hourlyResult, heatmapResult, recoResult] = await Promise.all([
        getDashboardSummary(),
        getHourlyOccupancy(),
        getWeeklyHeatmap(),
        getTopRecommendations(),
    ]);

    const summary       = summaryResult.data;
    const hourly        = hourlyResult.data;
    const heatmap       = heatmapResult.data;
    const recommendations = recoResult.data;

    const accentMap: Record<string, "green" | "amber" | "red"> = {
        Bajo: "green", Medio: "amber", Alto: "red", Crítico: "red",
    };
    const accent = accentMap[summary.current_occupancy_level] ?? "blue";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Panel administrativo GYMTEC</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Monitoreo de aforo, predicción y recomendaciones operativas
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <OccupancyBadge level={summary.current_occupancy_level} />
                    <SourceBadge source={summaryResult.source} />
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                <MetricCard
                    title="Aforo actual"
                    value={`${summary.current_occupancy_value}%`}
                    subtitle="Demanda estimada"
                    icon={Activity}
                    accent="blue"
                />
                <MetricCard
                    title="Nivel de ocupación"
                    value={summary.current_occupancy_level}
                    subtitle={`Fuente: ${summary.data_source}`}
                    icon={BarChart2}
                    accent={accent}
                />
                <MetricCard
                    title="Mejor horario"
                    value={summary.best_training_hour}
                    subtitle="Ventana recomendada"
                    icon={Clock}
                    accent="green"
                />
                <MetricCard
                    title="Hora pico"
                    value={summary.peak_hour}
                    subtitle="Mayor demanda estimada"
                    icon={TrendingUp}
                    accent="amber"
                />
                <MetricCard
                    title="Confianza semanal"
                    value={`${summary.weekly_confidence}%`}
                    subtitle="Predicción del modelo"
                    icon={Zap}
                    accent="cyan"
                />
                <MetricCard
                    title="Alumnos impactados"
                    value={summary.students_impacted}
                    subtitle="Usuarios activos"
                    icon={Users}
                    accent="blue"
                />
            </div>

            {/* Chart + Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Ocupación por hora</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{hourly.date}</span>
                            <SourceBadge source={hourlyResult.source} />
                        </div>
                    </CardHeader>
                    {hourly.items.length > 0 ? (
                        <HourlyOccupancyChart items={hourly.items} />
                    ) : (
                        <EmptyState label="Sin datos de ocupación horaria" />
                    )}
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top recomendaciones</CardTitle>
                        <SourceBadge source={recoResult.source} />
                    </CardHeader>
                    {recommendations.items.length > 0 ? (
                        <RecommendationList items={recommendations.items} />
                    ) : (
                        <EmptyState label="Sin recomendaciones disponibles" />
                    )}
                </Card>
            </div>

            {/* Heatmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Predicción semanal — Heatmap de aforo</CardTitle>
                    <SourceBadge source={heatmapResult.source} />
                </CardHeader>
                <p className="text-xs text-slate-500 mb-4">
                    Basado en patrones históricos, carga académica y disponibilidad estimada
                </p>
                <WeeklyHeatmap data={heatmap} />
            </Card>
        </div>
    );
}