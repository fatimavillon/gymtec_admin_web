import { getRecommendations } from "@/services/adminApi";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { OccupancyBadge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Lightbulb, Share2, TrendingDown, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const OPERATIVE_ACTIONS: Record<string, string> = {
    "1": "Promover este horario en la app estudiante",
    "2": "Comunicar disponibilidad a coordinación académica",
    "3": "Activar campaña de difusión para esta franja",
    "4": "Considerar como horario de apertura extendida",
    "5": "Evaluar agendamiento de actividades grupales",
};

export default async function RecommendationsPage() {
    let data;

    try {
        data = await getRecommendations();
    } catch {
        return (
            <div>
                <h1 className="text-xl font-bold text-slate-100 mb-4">Recomendaciones Operativas</h1>
                <ErrorState />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-100">Recomendaciones Operativas</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Horarios globales recomendados por el modelo para distribución de aforo
                </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-blue-600/20 bg-blue-600/5 p-4 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-slate-200">Ventanas recomendadas</p>
                        <p className="text-xs text-slate-400 mt-1">
                            Franjas con menor carga y mayor disponibilidad estimada según el modelo
                        </p>
                    </div>
                </div>
                <div className="rounded-xl border border-emerald-600/20 bg-emerald-600/5 p-4 flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-slate-200">Evitar horas pico</p>
                        <p className="text-xs text-slate-400 mt-1">
                            Distribuir demanda hacia franjas de menor aforo mejora la experiencia
                        </p>
                    </div>
                </div>
                <div className="rounded-xl border border-cyan-600/20 bg-cyan-600/5 p-4 flex items-start gap-3">
                    <Share2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-slate-200">Acción operativa</p>
                        <p className="text-xs text-slate-400 mt-1">
                            Cada recomendación incluye una acción sugerida para el equipo de operaciones
                        </p>
                    </div>
                </div>
            </div>

            {/* Recommendations list */}
            <Card>
                <CardHeader>
                    <CardTitle>Top horarios recomendados</CardTitle>
                    <span className="text-xs text-slate-500">{data.items.length} franjas</span>
                </CardHeader>

                {data.items.length === 0 ? (
                    <EmptyState label="Sin recomendaciones disponibles" />
                ) : (
                    <div className="space-y-3">
                        {data.items.map((slot) => (
                            <div
                                key={slot.rank}
                                className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-4 flex items-start gap-4"
                            >
                <span className="text-2xl font-black text-slate-700 w-8 flex-shrink-0 leading-none mt-1">
                  {slot.rank}
                </span>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-bold text-slate-100">
                      {slot.start_time} – {slot.end_time}
                    </span>
                                        <OccupancyBadge level={slot.level} />
                                        <span className="text-xs text-cyan-400 font-semibold">Score: {slot.score}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">{slot.reason}</p>
                                    <div className="flex items-center gap-2 text-xs text-blue-400">
                                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                        <span>{OPERATIVE_ACTIONS[String(slot.rank)] ?? "Evaluar disponibilidad operativa"}</span>
                                    </div>
                                </div>
                                {/* Score bar */}
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