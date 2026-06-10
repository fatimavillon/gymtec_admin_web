import { Lightbulb } from "lucide-react";
interface Props { insights: string[] }

export function FeedbackInsightsCard({ insights }: Props) {
    return (
        <div
            className="rounded-xl p-5 space-y-3"
            style={{
                background: "#FFFBEB",
                border: "1px solid #FDE68A",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
        >
            <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" style={{ color: "#d97706" }} />
                <p className="text-sm font-semibold" style={{ color: "#92400e" }}>Insights accionables</p>
            </div>
            <div className="space-y-2">
                {insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: "#d97706" }}
                        />
                        <p className="text-sm" style={{ color: "#78350f" }}>{insight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}