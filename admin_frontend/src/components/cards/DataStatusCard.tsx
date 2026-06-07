import type { DataStatus } from "@/types/admin";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatters";
import { FileStack, CheckCircle, Cpu, Archive } from "lucide-react";

interface Props { data: DataStatus }

export function DataStatusCard({ data }: Props) {
    const stats = [
        { label: "Raw",       count: data.raw_files,       Icon: FileStack,   color: "text-slate-300" },
        { label: "Interim",   count: data.interim_files,   Icon: Archive,     color: "text-blue-400"  },
        { label: "Processed", count: data.processed_files, Icon: CheckCircle, color: "text-amber-400" },
        { label: "Artifacts", count: data.model_artifacts, Icon: Cpu,         color: "text-purple-400"},
    ];

    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">Estado del Pipeline</p>
                <StatusBadge status={data.status} />
            </div>

            <div className="grid grid-cols-4 gap-2">
                {stats.map(({ label, count, Icon, color }) => (
                    <div key={label} className="bg-slate-900/60 rounded-lg p-3 text-center">
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
                        <p className="text-xl font-bold text-slate-200">{count}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                <p className="text-[11px] text-slate-500">Última actualización</p>
                <p className="text-[11px] text-slate-300 font-medium">{formatDate(data.last_update)}</p>
            </div>
        </div>
    );
}