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
        <div
            className="rounded-xl p-5 space-y-4"
            style={{
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                        style={{ background: "#0040A0" }}
                    >
                        {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-base font-bold" style={{ color: "#111827" }}>{name}</p>
                        <p className="text-xs" style={{ color: "#9CA3AF" }}>{responses} respuestas</p>
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 fill-current" style={{ color: "#DDAA66" }} />
                        <span className="text-lg font-bold" style={{ color: "#111827" }}>{rating}</span>
                        <span className="text-xs mb-0.5" style={{ color: "#9CA3AF" }}>/5</span>
                    </div>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: "#55CC22" }}>
                        {satisfaction}% satisfacción
                    </p>
                </div>
            </div>

            {/* Breakdown bars */}
            <div className="space-y-1.5">
                {bars.map(({ label, key, color }) => {
                    const pct = breakdown[key];
                    return (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-[11px] w-28 flex-shrink-0" style={{ color: "#6B7280" }}>{label}</span>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${pct}%`, background: color }}
                                />
                            </div>
                            <span className="text-[11px] w-8 text-right" style={{ color: "#6B7280" }}>{pct}%</span>
                        </div>
                    );
                })}
            </div>

            {/* Last comment */}
            <div
                className="rounded-lg px-3 py-2.5"
                style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
            >
                <p
                    className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "#9CA3AF" }}
                >
                    Último comentario destacado
                </p>
                <p className="text-xs italic" style={{ color: "#374151" }}>
                    &ldquo;{lastComment}&rdquo;
                </p>
            </div>
        </div>
    );
}