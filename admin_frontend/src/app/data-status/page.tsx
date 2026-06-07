import { getDataStatus, getDataSources } from "@/services/adminApi";
import { DataStatusCard } from "@/components/cards/DataStatusCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge, SourceBadge }   from "@/components/ui/Badge";
import { formatDate }      from "@/lib/formatters";
import { LAYER_BADGE }     from "@/lib/constants";
import { Database }        from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DataStatusPage() {
    const [statusResult, sourcesResult] = await Promise.all([
        getDataStatus(),
        getDataSources(),
    ]);

    const data    = statusResult.data;
    const sources = sourcesResult.data.sources;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Estado de Datos</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Pipeline de datos, archivos procesados y artefactos de modelo disponibles
                    </p>
                </div>
                <SourceBadge source={statusResult.source} />
            </div>

            {/* Status card */}
            <DataStatusCard data={data} />

            {/* Pipeline layer bars */}
            <Card>
                <CardHeader>
                    <CardTitle>Capas del pipeline</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: "Raw",        count: data.raw_files,       color: "text-slate-300",   bg: "bg-slate-700/30 border-slate-700/50" },
                        { label: "Interim",    count: data.interim_files,   color: "text-blue-400",    bg: "bg-blue-500/5  border-blue-500/20"  },
                        { label: "Processed",  count: data.processed_files, color: "text-amber-400",   bg: "bg-amber-500/5 border-amber-500/20" },
                        { label: "Artifacts",  count: data.model_artifacts, color: "text-purple-400",  bg: "bg-purple-500/5 border-purple-500/20" },
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
                        <span className="text-xs text-slate-500">
              Última actualización: {formatDate(data.last_update)}
            </span>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b border-slate-800">
                            {["Archivo", "Capa", "Descripción", "Requerido", "Estado"].map((h) => (
                                <th key={h} className="text-left text-xs text-slate-500 font-semibold uppercase pb-3 pr-4">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                        {sources.map((src) => (
                            <tr key={src.name}>
                                <td className="py-3 pr-4 font-mono text-xs text-cyan-400">{src.name}</td>
                                <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${LAYER_BADGE[src.layer] ?? ""}`}>
                      {src.layer}
                    </span>
                                </td>
                                <td className="py-3 pr-4 text-xs text-slate-400 max-w-xs">{src.description}</td>
                                <td className="py-3 pr-4 text-xs text-slate-400">
                                    {src.required ? "Sí" : "Opcional"}
                                </td>
                                <td className="py-3">
                                    <StatusBadge status={src.available ? "available" : "unavailable"} />
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