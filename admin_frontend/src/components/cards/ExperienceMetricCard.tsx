interface Props {
    label: string;
    value: number;
    max: number;
    unit?: string;
    color?: string;
}

export function ExperienceMetricCard({ label, value, max, unit = "/5", color = "#00CCFF" }: Props) {
    const pct = (value / max) * 100;

    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 flex flex-col gap-3">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
            <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-slate-100">{value}</span>
                <span className="text-xs text-slate-500 mb-0.5">{unit}</span>
            </div>
            <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
        </div>
    );
}