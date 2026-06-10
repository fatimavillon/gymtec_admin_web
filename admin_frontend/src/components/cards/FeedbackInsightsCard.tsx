import { Lightbulb } from "lucide-react";

interface Props { insights: string[] }

export function FeedbackInsightsCard({ insights }: Props) {
    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-3">
            <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" style={{ color: "#DDAA66" }} />
                <p className="text-sm font-semibold text-slate-200">Insights accionables</p>
            </div>
            <div className="space-y-2">
                {insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                             style={{ background: "#00CCFF" }} />
                        <p className="text-sm text-slate-400">{insight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}