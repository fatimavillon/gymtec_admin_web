import { getHourlyOccupancy }          from "@/services/adminApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge, SourceBadge } from "@/components/ui/Badge";
import { HourlyOccupancyChart }        from "@/components/charts/HourlyOccupancyChart";
import { EmptyState }                  from "@/components/ui/EmptyState";
import type { HourlyOccupancyItem }    from "@/types/admin";
import { GYM_OPERATION_SLOTS }         from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function OccupancyPage() {
    const hourlyResult = await getHourlyOccupancy();
    const hourly = hourlyResult.data;

    const items = hourly.items.filter((i) => GYM_OPERATION_SLOTS.includes(i.hour));

    const peak = items.reduce<HourlyOccupancyItem | null>(
        (m, i) => (!m || i.occupancy > m.occupancy ? i : m), null
    );
    const low  = items.filter((i) => i.level === "Bajo");
    const high = items.filter((i) => i.level === "Alto" || i.level === "Crítico");

    const tiles = [
        { label: "Hora pico",             value: peak?.hour ?? "—",          sub: `${peak?.occupancy ?? 0}% aforo`,      color: "#F59E0B" },
        { label: "Aforo en hora pico",    value: `${peak?.occupancy ?? 0}%`, sub: "Máximo del día",                      color: "#dc2626" },
        { label: "Franjas de bajo aforo", value: low.length,                 sub: "ventanas disponibles",                color: "#16a34a" },
        { label: "Franjas de alto aforo", value: high.length,                sub: "horas de mayor demanda",              color: "#dc2626" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold" style={{ color: "#111827" }}>Ocupación del Gimnasio</h1>
                    <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                        Análisis de aforo por hora · Horario operativo 09:00 – 18:00
                    </p>
                </div>
                <SourceBadge source={hourlyResult.source} />
            </div>

            {/* Summary tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tiles.map(({ label, value, sub, color }) => (
                    <div
                        key={label}
                        className="rounded-xl p-4"
                        style={{ background: "#ffffff", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>
                            {label}
                        </p>
                        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{sub}</p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Aforo esperado por hora</CardTitle>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{hourly.date} · 09:00 – 18:00</span>
                </CardHeader>
                {items.length > 0 ? <HourlyOccupancyChart items={items} /> : <EmptyState />}
            </Card>

            {/* Detail table */}
            <Card>
                <CardHeader>
                    <CardTitle>Detalle por franja horaria</CardTitle>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{items.length} franjas operativas</span>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                            {["Hora", "Aforo estimado", "Nivel", "Distribución"].map((h) => (
                                <th
                                    key={h}
                                    className="text-left text-xs font-semibold uppercase pb-3 pr-4"
                                    style={{ color: "#9CA3AF" }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => {
                            const barColor =
                                item.level === "Bajo"  ? "#55CC22" :
                                    item.level === "Medio" ? "#DDAA66" :
                                        item.level === "Alto"  ? "#FF4433" : "#DC2626";
                            return (
                                <tr key={item.hour} style={{ borderBottom: "1px solid #F9FAFB" }}>
                                    <td className="py-2.5 pr-4 font-mono" style={{ color: "#374151" }}>{item.hour}</td>
                                    <td className="py-2.5 pr-4 font-semibold" style={{ color: barColor }}>{item.occupancy}%</td>
                                    <td className="py-2.5 pr-4"><OccupancyBadge level={item.level} /></td>
                                    <td className="py-2.5 w-40">
                                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${item.occupancy}%`, background: barColor }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}