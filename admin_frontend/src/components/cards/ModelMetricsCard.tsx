import type { ModelMetric } from "@/types/admin";
import { StatusBadge } from "@/components/ui/Badge";
import { BrainCircuit } from "lucide-react";

interface Props { model: ModelMetric }

export function ModelMetricsCard({ model }: Props) {
    const displayValue =
        model.metric_value <= 1
            ? `${(model.metric_value * 100).toFixed(1)}%`
            : model.metric_value.toFixed(3);

    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <BrainCircuit className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-200">{model.name}</p>
                        <p className="text-xs text-slate-500">{model.type}</p>
                    </div>
                </div>
                <StatusBadge status={model.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        {model.metric_name}
                    </p>
                    <p className="text-2xl font-bold text-cyan-400">{displayValue}</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        Estado
                    </p>
                    <p className="text-sm font-semibold text-slate-200 capitalize">{model.status}</p>
                </div>
            </div>

            <p className="text-xs text-slate-500 pt-1 border-t border-slate-700/50">
                {model.description}
            </p>
        </div>
    );
}