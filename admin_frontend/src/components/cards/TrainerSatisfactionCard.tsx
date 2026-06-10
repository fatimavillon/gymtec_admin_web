import type { TrainerFeedback } from "@/types/feedback";
import { Star } from "lucide-react";

interface Props { trainer: TrainerFeedback }

export function TrainerSatisfactionCard({ trainer }: Props) {
    const { name, rating, responses, satisfaction, breakdown, lastComment } = trainer;

    const bars: { label: string; key: keyof typeof breakdown; color: string }[] = [
        { label: "Muy satisfecho", key: "very_satisfied", color: "#55CC22" },
        { label: "Satisfecho",     key: "satisfied",      color: "#DDAA66" },
        { label: "Neutral",        key: "neutral",        color: "#C0C0C0" },
        { label: "Insatisfecho",   key: "dissatisfied",   color: "#FF4433" },
    ];

    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                         style={{ background: "#0040A0" }}>
                        {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-base font-bold text-slate-100">{name}</p>
                        <p className="text-xs text-slate-500">{responses} respuestas</p>
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 fill-current" style={{ color: "#DDAA66" }} />
                        <span className="text-lg font-bold text-slate-100">{rating}</span>
                        <span className="text-xs text-slate-500">/5</span>
                    </div>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: "#55CC22" }}>
                        {satisfaction}% satisfacción
                    </p>
                </div>
            </div>

            {/* Satisfaction bar */}
            <div className="space-y-1.5">
                {bars.map(({ label, key, color }) => {
                    const pct = breakdown[key];
                    return (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-500 w-28 flex-shrink-0">{label}</span>
                            <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all"
                                     style={{ width: `${pct}%`, background: color }} />
                            </div>
                            <span className="text-[11px] text-slate-400 w-8 text-right">{pct}%</span>
                        </div>
                    );
                })}
            </div>

            {/* Last comment */}
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/50 px-3 py-2.5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    Último comentario destacado
                </p>
                <p className="text-xs text-slate-300 italic">&ldquo;{lastComment}&rdquo;</p>
            </div>
        </div>
    );
}