import { getModelMetrics } from "@/services/adminApi";
import { ModelMetricsCard } from "@/components/cards/ModelMetricsCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { SourceBadge } from "@/components/ui/Badge";
import { EmptyState }  from "@/components/ui/EmptyState";
import { BrainCircuit, PackageCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const MODEL_INFO: Record<string, { title: string; detail: string }> = {
    rf01_aforo_baseline: {
        title:  "Modelo de predicción de aforo",
        detail: "RandomForestRegressor · MAE=2.63 · RMSE=3.59 · R²=0.890",
    },
    rf02_recomendador_score: {
        title:  "Modelo de recomendación de horarios",
        detail: "Ridge Regressor · MAE=0.033 · R²=0.927 · NDCG@3=0.998",
    },
};

export default async function ModelsPage() {
    const result = await getModelMetrics();
    const { models } = result.data;

    const available = models.filter((m) => m.status === "available").length;
    const avgMetric = models.length
        ? (models.reduce((s, m) => s + m.metric_value, 0) / models.length)
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Modelos ML</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Estado de artefactos, métricas de evaluación y versiones desplegadas
                    </p>
                </div>
                <SourceBadge source={result.source} />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Total modelos</p>
                    <p className="text-2xl font-bold text-slate-200">{models.length}</p>
                </div>
                <div className="rounded-xl border border-emerald-600/20 bg-emerald-600/5 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Disponibles</p>
                    <p className="text-2xl font-bold text-emerald-400">{available}</p>
                </div>
                <div className="rounded-xl border border-blue-600/20 bg-blue-600/5 p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Métrica promedio</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {avgMetric <= 1
                            ? `${(avgMetric * 100).toFixed(1)}%`
                            : avgMetric.toFixed(3)}
                    </p>
                </div>
            </div>

            {/* Model cards */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold text-slate-300">Artefactos de modelo</h2>
                </div>
                {models.length === 0 ? (
                    <EmptyState label="Sin modelos registrados" />
                ) : (
                    <div className="space-y-4">
                        {models.map((model) => (
                            <div key={model.name} className="space-y-1">
                                {MODEL_INFO[model.name] && (
                                    <div className="px-1">
                                        <p className="text-xs font-semibold text-slate-300">
                                            {MODEL_INFO[model.name].title}
                                        </p>
                                        <p className="text-[11px] text-slate-500 font-mono">
                                            {MODEL_INFO[model.name].detail}
                                        </p>
                                    </div>
                                )}
                                <ModelMetricsCard model={model} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Training data sources */}
            <Card>
                <CardHeader>
                    <CardTitle>Fuentes de datos para entrenamiento</CardTitle>
                    <PackageCheck className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <div className="space-y-0 divide-y divide-slate-800/50">
                    {[
                        { file: "log_gym.xlsx",                    desc: "Logs históricos del gimnasio — aforo por hora/día" },
                        { file: "horarios_clases.xlsx",            desc: "Carga académica UTEC — horarios de clases" },
                        { file: "aforo_por_slot.parquet",          desc: "Aforo agregado por slot — feature principal RF-01" },
                        { file: "features_aforo_rf01.parquet",     desc: "Features engineered para entrenamiento RF-01" },
                        { file: "predicciones_aforo.parquet",      desc: "Output de RF-01 — predicciones de aforo" },
                        { file: "recomendaciones_horario.parquet", desc: "Output de RF-02 — scores de recomendación" },
                    ].map(({ file, desc }) => (
                        <div key={file} className="flex items-center gap-3 py-2.5">
                            <span className="font-mono text-xs text-cyan-400 w-64 flex-shrink-0">{file}</span>
                            <span className="text-xs text-slate-400">{desc}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}