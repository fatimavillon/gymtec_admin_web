import type { DataStatus } from "@/types/admin";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatters";
import { FileStack, Cpu, CheckCircle } from "lucide-react";

interface DataStatusCardProps {
    data: DataStatus;
}

export function DataStatusCard({ data }: DataStatusCardProps) {
    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">Estado del Pipeline</p>
                <StatusBadge status={data.status} />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <FileStack className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-200">{data.raw_files}</p>
                    <p className="text-[10px] text-slate-500">Archivos raw</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-200">{data.processed_files}</p>
                    <p className="text-[10px] text-slate-500">Procesados</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <Cpu className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-200">{data.model_artifacts}</p>
                    <p className="text-[10px] text-slate-500">Artefactos</p>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                <p className="text-[11px] text-slate-500">Última actualización</p>
                <p className="text-[11px] text-slate-300 font-medium">{formatDate(data.last_update)}</p>
            </div>
        </div>
    );
}