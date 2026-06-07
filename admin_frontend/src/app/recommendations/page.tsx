import { getTopRecommendations } from "@/services/adminApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge, SourceBadge } from "@/components/ui/Badge";
import { EmptyState }           from "@/components/ui/EmptyState";
import { Lightbulb, Share2, TrendingDown, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const ACTIONS: Record<number, string> = {
    1: "Promover este horario en la app estudiante",
    2: "Comunicar disponibilidad a coordinación académica",
    3: "Activar campaña de difusión para esta franja",
    4: "Distribuir demanda hacia esta ventana horaria",
    5: "Evitar campañas en las horas pico adyacentes",
};

export default async function RecommendationsPage() {
    const result = await getTopRecommendations();
    const { items } = result.data;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Recomendaciones Operativas</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Horarios globales recomendados por el modelo para distribución óptima de aforo
                    </p>
                </div>
                <SourceBadge source={result.source} />
            </div>

            {/* Info row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { Icon: Lightbulb, color: "text-blue-400",   bg: "border-blue-600/20 bg-blue-600/5",   title: "Ventanas recomendadas",   body: "Franjas con menor carga y mayor disponibilidad estimada según el modelo RF-02" },
                    { Icon: TrendingDown, color: "text-emerald-400", bg: "border-emerald-600/20 bg-emerald-600/5", title: "Evitar horas pico",  body: "Distribuir demanda hacia franjas de menor aforo mejora la experiencia del alumno" },
                    { Icon: Share2, color: "text-cyan-400",    bg: "border-cyan-600/20 bg-cyan-600/5",    title: "Acción operativa",        body: "Cada recomendación incluye una acción concreta para el equipo de operaciones" },
                ].map(({ Icon, color, bg, title, body }) => (
                    <div key={title} className={`rounded-xl border p-4 flex items-start gap-3 ${bg}`}>
                        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
                        <div>
                            <p className="text-sm font-semibold text-slate-200">{title}</p>
                            <p className="text-xs text-slate-400 mt-1">{body}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* List */}
            <Card>
                <CardHeader>
                    <CardTitle>Top horarios recomendados</CardTitle>
                    <span className="text-xs text-slate-500">{items.length} franjas</span>
                </CardHeader>

                {items.length === 0 ? (
                    <EmptyState label="Sin recomendaciones disponibles" />
                ) : (
                    <div className="space-y-3">
                        {items.map((slot) => (
                            <div
                                key={slot.rank}
                                className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-4 flex items-start gap-4"
                            >
                <span className="text-2xl font-black text-slate-700 w-8 flex-shrink-0 leading-none mt-1">
                  {slot.rank}
                </span>
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                    <span className="text-base font-bold text-slate-100">
                      {slot.start_time} – {slot.end_time}
                    </span>
                                        <OccupancyBadge level={slot.level} />
                                        <span className="text-xs text-cyan-400 font-semibold">
                      Score: {slot.score}
                    </span>
                                    </div>
                                    <p className="text-sm text-slate-400">{slot.reason}</p>
                                    <div className="flex items-center gap-2 text-xs text-blue-400">
                                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                        <span>{ACTIONS[slot.rank] ?? "Evaluar disponibilidad operativa"}</span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                                    <span className="text-xs text-slate-500">Confianza</span>
                                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-cyan-400"
                                            style={{ width: `${slot.score}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}