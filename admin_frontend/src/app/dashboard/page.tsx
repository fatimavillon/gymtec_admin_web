import {
    getDashboardSummary,
    getHourlyOccupancy,
    getWeeklyHeatmap,
} from "@/services/adminApi";
import { MetricCard }                   from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle }  from "@/components/ui/Card";
import { OccupancyBadge, SourceBadge } from "@/components/ui/Badge";
import { HourlyOccupancyChart }         from "@/components/charts/HourlyOccupancyChart";
import { WeeklyHeatmap }                from "@/components/charts/WeeklyHeatmap";
import { EmptyState }                   from "@/components/ui/EmptyState";
import { Users, Activity, Clock, TrendingUp, BarChart2, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const [summaryResult, hourlyResult, heatmapResult] = await Promise.all([
        getDashboardSummary(),
        getHourlyOccupancy(),
        getWeeklyHeatmap(),
    ]);

    const summary = summaryResult.data;
    const hourly  = hourlyResult.data;
    const heatmap = heatmapResult.data;

    const accentMap: Record<string, "green" | "amber" | "red"> = {
        Bajo: "green", Medio: "amber", Alto: "red", Crítico: "red",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold" style={{ color: "#111827" }}>
                        Panel administrativo GYMTEC
                    </h1>
                    <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
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
                <MetricCard title="Aforo actual"       value={`${summary.current_occupancy_value}%`} subtitle="Demanda estimada"         icon={Activity}   accent="blue" />
                <MetricCard title="Nivel de ocupación" value={summary.current_occupancy_level}       subtitle={' '} icon={BarChart2} accent={accentMap[summary.current_occupancy_level] ?? "blue"} />
                <MetricCard title="Mejor horario"      value={summary.best_training_hour}            subtitle="Ventana recomendada"      icon={Clock}      accent="green" />
                <MetricCard title="Hora pico"          value={summary.peak_hour}                     subtitle="Mayor demanda estimada"   icon={TrendingUp} accent="amber" />
                <MetricCard title="Confianza semanal"  value={`${summary.weekly_confidence}%`}       subtitle="Predicción del modelo"    icon={Zap}        accent="cyan" />
                <MetricCard title="Alumnos impactados" value={summary.students_impacted}             subtitle="Usuarios activos"         icon={Users}      accent="blue" />
            </div>

            {/* Hourly chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Ocupación por hora</CardTitle>
                    <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              {hourly.date} · 09:00 – 18:00
            </span>
                        <SourceBadge source={hourlyResult.source} />
                    </div>
                </CardHeader>
                {hourly.items.length > 0
                    ? <HourlyOccupancyChart items={hourly.items} />
                    : <EmptyState label="Sin datos de ocupación horaria" />}
            </Card>

            {/* Heatmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Predicción semanal — Heatmap de aforo</CardTitle>
                    <SourceBadge source={heatmapResult.source} />
                </CardHeader>
                <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
                    Basado en patrones históricos y carga académica · Sábado cierra a las 13:00
                </p>
                <WeeklyHeatmap data={heatmap} />
            </Card>
        </div>
    );
}