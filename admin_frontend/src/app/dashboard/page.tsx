import {
    getDashboardSummary,
    getHourlyOccupancy,
    getWeeklyHeatmap,
    getRecommendations,
} from "@/services/adminApi";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge } from "@/components/ui/Badge";
import { HourlyOccupancyChart } from "@/components/charts/HourlyOccupancyChart";
import { WeeklyHeatmap } from "@/components/charts/WeeklyHeatmap";
import { RecommendationList } from "@/components/cards/RecommendationList";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import {
    Users,
    Activity,
    Clock,
    TrendingUp,
    BarChart2,
    Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    let summary, hourly, heatmap, recommendations;

    try {
        [summary, hourly, heatmap, recommendations] = await Promise.all([
            getDashboardSummary(),
            getHourlyOccupancy(),
            getWeeklyHeatmap(),
            getRecommendations(),
        ]);
    } catch {
        return (
            <div>
                <h1 className="text-xl font-bold text-slate-100 mb-1">Panel administrativo GYMTEC</h1>
                <p className="text-sm text-slate-400 mb-6">
                    Monitoreo de aforo, predicción y recomendaciones operativas
                </p>
                <ErrorState />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Panel administrativo GYMTEC</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Monitoreo de aforo, predicción y recomendaciones operativas
                    </p>
                </div>
                <OccupancyBadge level={summary.current_occupancy_level} />
            </div>

            {/* KPI Cards */}
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
                    accent={
                        summary.current_occupancy_level === "Bajo"
                            ? "green"
                            : summary.current_occupancy_level === "Medio"
                                ? "amber"
                                : "red"
                    }
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

            {/* Hourly chart + Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Ocupación por hora</CardTitle>
                        <span className="text-xs text-slate-500">{hourly.date}</span>
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
                    </CardHeader>
                    {recommendations.items.length > 0 ? (
                        <RecommendationList items={recommendations.items} />
                    ) : (
                        <EmptyState label="Sin recomendaciones disponibles" />
                    )}
                </Card>
            </div>

            {/* Weekly Heatmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Predicción semanal — Heatmap de aforo</CardTitle>
                </CardHeader>
                <p className="text-xs text-slate-500 mb-4">
                    Basado en patrones históricos, carga académica y disponibilidad estimada
                </p>
                <WeeklyHeatmap data={heatmap} />
            </Card>
        </div>
    );
}