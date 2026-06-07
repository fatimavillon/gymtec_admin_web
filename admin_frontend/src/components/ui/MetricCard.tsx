import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Accent = "blue" | "green" | "amber" | "red" | "cyan" | "purple";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    accent?: Accent;
    trend?: string;
}

const ACCENT: Record<Accent, { icon: string; value: string }> = {
    blue:   { icon: "bg-blue-500/10   border-blue-500/20   text-blue-400",   value: "text-blue-300"   },
    green:  { icon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", value: "text-emerald-300" },
    amber:  { icon: "bg-amber-500/10  border-amber-500/20  text-amber-400",  value: "text-amber-300"  },
    red:    { icon: "bg-red-500/10    border-red-500/20    text-red-400",    value: "text-red-300"    },
    cyan:   { icon: "bg-cyan-500/10   border-cyan-500/20   text-cyan-400",   value: "text-cyan-300"   },
    purple: { icon: "bg-purple-500/10 border-purple-500/20 text-purple-400", value: "text-purple-300" },
};

export function MetricCard({
                               title,
                               value,
                               subtitle,
                               icon: Icon,
                               accent = "blue",
                               trend,
                           }: MetricCardProps) {
    const s = ACCENT[accent];
    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</p>
                <div className={clsx("w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0", s.icon)}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <div>
                <p className={clsx("text-3xl font-bold tracking-tight", s.value)}>{value}</p>
                {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
            </div>
            {trend && (
                <p className="text-xs text-slate-500 border-t border-slate-700/50 pt-2">{trend}</p>
            )}
        </div>
    );
}