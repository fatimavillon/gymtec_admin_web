import { getHourlyOccupancy, getWeeklyHeatmap } from "@/services/adminApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge, SourceBadge } from "@/components/ui/Badge";
import { HourlyOccupancyChart } from "@/components/charts/HourlyOccupancyChart";
import { WeeklyHeatmap }        from "@/components/charts/WeeklyHeatmap";
import { EmptyState }           from "@/components/ui/EmptyState";
import type { HourlyOccupancyItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function OccupancyPage() {
    const [hourlyResult, heatmapResult] = await Promise.all([
        getHourlyOccupancy(),
        getWeeklyHeatmap(),
    ]);

    const hourly  = hourlyResult.data;
    const heatmap = heatmapResult.data;

    const peak = hourly.items.reduce<HourlyOccupancyItem | null>(
        (m, i) => (!m || i.occupancy > m.occupancy ? i : m),
        null
    );
    const low  = hourly.items.filter((i) => i.level === "Bajo");
    const high = hourly.items.filter((i) => i.level === "Alto" || i.level === "Crítico");

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Ocupación del Gimnasio</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Análisis de aforo por hora y distribución semanal de demanda
                    </p>
                </div>
                <SourceBadge source={hourlyResult.source} />
            </div>

            {/* Summary tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: "Hora pico",            value: peak?.hour ?? "—",    sub: `${peak?.occupancy ?? 0}% aforo`, color: "text-amber-400" },
                    { label: "Aforo en hora pico",   value: `${peak?.occupancy ?? 0}%`, sub: "Máximo del día", color: "text-red-400" },
                    { label: "Franjas de bajo aforo",value: low.length,  sub: "ventanas disponibles",  color: "text-emerald-400" },
                    { label: "Franjas de alto aforo",value: high.length, sub: "horas de mayor demanda", color: "text-red-400" },
                ].map(({ label, value, sub, color }) => (
                    <div key={label} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">{label}</p>
                        <p className={`text-2xl font-bold ${color}`}>{value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </div>
                ))}
            </div>

            {/* Hourly Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Aforo esperado por hora</CardTitle>
                    <span className="text-xs text-slate-500">{hourly.date}</span>
                </CardHeader>
                {hourly.items.length > 0
                    ? <HourlyOccupancyChart items={hourly.items} />
                    : <EmptyState />}
            </Card>

            {/* Detail table */}
            <Card>
                <CardHeader>
                    <CardTitle>Detalle por franja horaria</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-slate-800">
                            {["Hora", "Aforo estimado", "Nivel", "Distribución"].map((h) => (
                                <th key={h} className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                        {hourly.items.map((item) => (
                            <tr key={item.hour}>
                                <td className="py-2.5 pr-4 font-mono text-slate-300">{item.hour}</td>
                                <td className="py-2.5 pr-4 text-slate-200 font-semibold">{item.occupancy}%</td>
                                <td className="py-2.5 pr-4"><OccupancyBadge level={item.level} /></td>
                                <td className="py-2.5 w-40">
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${item.occupancy}%`,
                                                background:
                                                    item.level === "Bajo" ? "#10B981" :
                                                        item.level === "Medio" ? "#F59E0B" : "#EF4444",
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Heatmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Predicción semanal — Heatmap</CardTitle>
                    <SourceBadge source={heatmapResult.source} />
                </CardHeader>
                <p className="text-xs text-slate-500 mb-4">
                    Ventanas recomendadas para distribuir aforo · Lunes a Sábado
                </p>
                <WeeklyHeatmap data={heatmap} />
            </Card>
        </div>
    );
}