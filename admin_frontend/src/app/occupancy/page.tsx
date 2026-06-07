import { getHourlyOccupancy, getWeeklyHeatmap } from "@/services/adminApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { HourlyOccupancyChart } from "@/components/charts/HourlyOccupancyChart";
import { WeeklyHeatmap } from "@/components/charts/WeeklyHeatmap";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import type { HourlyOccupancyItem } from "@/types/admin";
import { OccupancyBadge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function OccupancyPage() {
    let hourly, heatmap;

    try {
        [hourly, heatmap] = await Promise.all([
            getHourlyOccupancy(),
            getWeeklyHeatmap(),
        ]);
    } catch {
        return (
            <div>
                <h1 className="text-xl font-bold text-slate-100 mb-4">Ocupación del Gimnasio</h1>
                <ErrorState />
            </div>
        );
    }

    const peak = hourly.items.reduce(
        (max: HourlyOccupancyItem | null, item) =>
            !max || item.occupancy > max.occupancy ? item : max,
        null
    );
    const low = hourly.items.filter((i) => i.level === "Bajo");
    const high = hourly.items.filter((i) => i.level === "Alto");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-100">Ocupación del Gimnasio</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Análisis de aforo por hora y distribución semanal de demanda
                </p>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Hora pico
                    </p>
                    <p className="text-2xl font-bold text-amber-400">{peak?.hour ?? "—"}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{peak?.occupancy ?? 0}% de aforo</p>
                </div>
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Horas de menor demanda
                    </p>
                    <p className="text-2xl font-bold text-emerald-400">{low.length}</p>
                    <p className="text-xs text-slate-500 mt-0.5">franjas con aforo bajo</p>
                </div>
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Horas de mayor demanda
                    </p>
                    <p className="text-2xl font-bold text-red-400">{high.length}</p>
                    <p className="text-xs text-slate-500 mt-0.5">franjas con aforo alto</p>
                </div>
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Total franjas
                    </p>
                    <p className="text-2xl font-bold text-slate-200">{hourly.items.length}</p>
                    <p className="text-xs text-slate-500 mt-0.5">horas analizadas hoy</p>
                </div>
            </div>

            {/* Hourly Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Aforo esperado por hora</CardTitle>
                    <span className="text-xs text-slate-500">{hourly.date}</span>
                </CardHeader>
                {hourly.items.length > 0 ? (
                    <HourlyOccupancyChart items={hourly.items} />
                ) : (
                    <EmptyState />
                )}
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
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Hora</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Aforo estimado</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Nivel</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3">Barra</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                        {hourly.items.map((item) => (
                            <tr key={item.hour}>
                                <td className="py-2.5 pr-4 font-mono text-slate-300">{item.hour}</td>
                                <td className="py-2.5 pr-4 text-slate-200 font-semibold">{item.occupancy}%</td>
                                <td className="py-2.5 pr-4">
                                    <OccupancyBadge level={item.level} />
                                </td>
                                <td className="py-2.5 w-40">
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${item.occupancy}%`,
                                                background:
                                                    item.level === "Bajo"
                                                        ? "#10B981"
                                                        : item.level === "Medio"
                                                            ? "#F59E0B"
                                                            : "#EF4444",
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
                </CardHeader>
                <p className="text-xs text-slate-500 mb-4">
                    Ventanas recomendadas para distribuir aforo · Lunes a Sábado
                </p>
                <WeeklyHeatmap data={heatmap} />
            </Card>
        </div>
    );
}