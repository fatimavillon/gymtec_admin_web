interface Props {
    label: string;
    value: number;
    max: number;
    unit?: string;
    color?: string;
}

export function ExperienceMetricCard({ label, value, max, unit = "/5", color = "#0040A0" }: Props) {
    const pct = (value / max) * 100;
    return (
        <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
        >
            <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "#6B7280" }}
            >
                {label}
            </p>
            <div className="flex items-end gap-1">
                <span className="text-2xl font-bold" style={{ color: "#111827" }}>{value}</span>
                <span className="text-xs mb-0.5" style={{ color: "#9CA3AF" }}>{unit}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
        </div>
    );
}