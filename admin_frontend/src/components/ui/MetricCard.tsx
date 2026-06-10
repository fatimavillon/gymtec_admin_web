import type { LucideIcon } from "lucide-react";

type Accent = "blue" | "green" | "amber" | "red" | "cyan" | "purple";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    accent?: Accent;
    trend?: string;
}

// Light-mode accent tokens — icon bg / icon color / value color
const ACCENT: Record<Accent, { bg: string; iconColor: string; valueColor: string }> = {
    blue:   { bg: "#EFF6FF", iconColor: "#0040A0", valueColor: "#0040A0" },
    green:  { bg: "#F0FDF4", iconColor: "#16a34a", valueColor: "#15803d" },
    amber:  { bg: "#FFFBEB", iconColor: "#d97706", valueColor: "#b45309" },
    red:    { bg: "#FEF2F2", iconColor: "#dc2626", valueColor: "#b91c1c" },
    cyan:   { bg: "#ECFEFF", iconColor: "#0891b2", valueColor: "#0040A0" },
    purple: { bg: "#FAF5FF", iconColor: "#7c3aed", valueColor: "#6d28d9" },
};

export function MetricCard({
                               title, value, subtitle, icon: Icon, accent = "blue", trend,
                           }: MetricCardProps) {
    const s = ACCENT[accent];
    return (
        <div
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
        >
            <div className="flex items-start justify-between">
                <p
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "#6B7280" }}
                >
                    {title}
                </p>
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: s.bg }}
                >
                    <Icon className="w-4 h-4" style={{ color: s.iconColor }} />
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold tracking-tight" style={{ color: s.valueColor }}>
                    {value}
                </p>
                {subtitle && (
                    <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{subtitle}</p>
                )}
            </div>
            {trend && (
                <p
                    className="text-xs pt-2"
                    style={{ color: "#9CA3AF", borderTop: "1px solid #F3F4F6" }}
                >
                    {trend}
                </p>
            )}
        </div>
    );
}