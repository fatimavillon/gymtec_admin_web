import { getModelMetrics } from "@/services/adminApi";
import { ModelMetricsCard } from "@/components/cards/ModelMetricsCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { BrainCircuit, PackageCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ModelsPage() {
    let data;

    try {
        data = await getModelMetrics();
    } catch {
        return (
            <div>
                <h1 className="text-xl font-bold text-slate-100 mb-4">Modelos ML</h1>
                <ErrorState />
            </div>
        );
    }

    const available = data.models.filter((m) => m.status === "available");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-100">Modelos ML</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Estado de artefactos, métricas y versiones de los modelos desplegados
                </p>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Total modelos
                    </p>
                    <p className="text-2xl font-bold text-slate-200">{data.models.length}</p>
                </div>
                <div className="rounded-xl border border-emerald-600/20 bg-emerald-600/5 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Disponibles
                    </p>
                    <p className="text-2xl font-bold text-emerald-400">{available.length}</p>
                </div>
                <div className="rounded-xl border border-blue-600/20 bg-blue-600/5 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Confianza promedio
                    </p>
                    <p className="text-2xl font-bold text-blue-400">
                        {data.models.length > 0
                            ? Math.round(
                                data.models.reduce((s, m) => s + m.metric_value, 0) / data.models.length
                            )
                            : "—"}
                        %
                    </p>
                </div>
            </div>

            {/* Models grid */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold text-slate-300">Artefactos de modelo</h2>
                </div>
                {data.models.length === 0 ? (
                    <EmptyState label="Sin modelos registrados" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.models.map((model) => (
                            <ModelMetricsCard key={model.name} model={model} />
                        ))}
                    </div>
                )}
            </div>

            {/* Data sources info */}
            <Card>
                <CardHeader>
                    <CardTitle>Fuente de datos para entrenamiento</CardTitle>
                    <PackageCheck className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <div className="space-y-2">
                    {[
                        { file: "log_gym.xlsx", desc: "Logs históricos del gimnasio — aforo por hora/día" },
                        { file: "horarios_clases.xlsx", desc: "Carga académica UTEC — horarios de clases" },
                        { file: "predicciones_aforo.csv", desc: "Predicciones generadas por rf01_aforo_baseline" },
                        { file: "recomendaciones_horario.csv", desc: "Salida del modelo rf02_recomendador_score" },
                    ].map(({ file, desc }) => (
                        <div key={file} className="flex items-center gap-3 py-2 border-b border-slate-800/50 last:border-0">
                            <span className="font-mono text-xs text-cyan-400 w-56 flex-shrink-0">{file}</span>
                            <span className="text-xs text-slate-400">{desc}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}