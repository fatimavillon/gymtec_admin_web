import { getDataStatus } from "@/services/adminApi";
import { DataStatusCard } from "@/components/cards/DataStatusCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/ui/ErrorState";
import { formatDate } from "@/lib/formatters";
import { Database } from "lucide-react";

export const dynamic = "force-dynamic";

const DATA_SOURCES = [
    { name: "log_gym.xlsx", type: "Raw", layer: "Raw", desc: "Registros históricos del gimnasio" },
    { name: "horarios_clases.xlsx", type: "Raw", layer: "Raw", desc: "Horarios académicos UTEC" },
    { name: "predicciones_aforo.csv", type: "Processed", layer: "Gold", desc: "Predicciones procesadas de aforo" },
    { name: "recomendaciones_horario.csv", type: "Processed", layer: "Gold", desc: "Recomendaciones procesadas de horario" },
    { name: "rf01_aforo_baseline.pkl", type: "Model", layer: "Artifact", desc: "Modelo Random Forest de aforo" },
    { name: "rf02_recomendador_score.pkl", type: "Model", layer: "Artifact", desc: "Modelo Random Forest de recomendación" },
];

const layerStyles: Record<string, string> = {
    Raw: "bg-slate-700/50 text-slate-300 border-slate-600/30",
    Silver: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Gold: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Artifact: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default async function DataStatusPage() {
    let data;

    try {
        data = await getDataStatus();
    } catch {
        return (
            <div>
                <h1 className="text-xl font-bold text-slate-100 mb-4">Estado de Datos</h1>
                <ErrorState />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-100">Estado de Datos</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Estado del pipeline, archivos procesados y artefactos de modelo disponibles
                </p>
            </div>

            {/* Status card */}
            <DataStatusCard data={data} />

            {/* Pipeline layers */}
            <Card>
                <CardHeader>
                    <CardTitle>Capas del pipeline</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Raw", count: data.raw_files, color: "text-slate-300", bg: "bg-slate-700/30 border-slate-700/50" },
                        { label: "Processed (Gold)", count: data.processed_files, color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/20" },
                        { label: "Model Artifacts", count: data.model_artifacts, color: "text-purple-400", bg: "bg-purple-500/5 border-purple-500/20" },
                    ].map(({ label, count, color, bg }) => (
                        <div key={label} className={`rounded-lg border p-4 text-center ${bg}`}>
                            <p className={`text-2xl font-bold ${color}`}>{count}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Sources table */}
            <Card>
                <CardHeader>
                    <CardTitle>Fuentes de datos</CardTitle>
                    <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-slate-500" />
                        <span className="text-xs text-slate-500">Última actualización: {formatDate(data.last_update)}</span>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-slate-800">
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Archivo</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Capa</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">Tipo</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3">Descripción</th>
                            <th className="text-left text-xs text-slate-500 font-semibold uppercase pb-3">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                        {DATA_SOURCES.map((src) => (
                            <tr key={src.name}>
                                <td className="py-3 pr-4 font-mono text-xs text-cyan-400">{src.name}</td>
                                <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${layerStyles[src.layer]}`}>
                      {src.layer}
                    </span>
                                </td>
                                <td className="py-3 pr-4 text-xs text-slate-400">{src.type}</td>
                                <td className="py-3 pr-4 text-xs text-slate-400">{src.desc}</td>
                                <td className="py-3">
                                    <StatusBadge status="available" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}