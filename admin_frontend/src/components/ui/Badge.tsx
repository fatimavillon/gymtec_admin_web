import clsx from "clsx";
import type { OccupancyLevel } from "@/types/admin";
import { getOccupancyLevelBadge } from "@/lib/formatters";
import { STATUS_BADGE, STATUS_LABELS } from "@/lib/constants";

interface BadgeProps { label: string; className?: string }

export function Badge({ label, className }: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                className
            )}
        >
      {label}
    </span>
    );
}

interface OccupancyBadgeProps { level: OccupancyLevel }
export function OccupancyBadge({ level }: OccupancyBadgeProps) {
    return <Badge label={level} className={getOccupancyLevelBadge(level)} />;
}

interface StatusBadgeProps {
    status: "ready"|"processing"|"error"|"available"|"unavailable"|"training";
}
export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <Badge
            label={STATUS_LABELS[status] ?? status}
            className={STATUS_BADGE[status] ?? STATUS_BADGE["error"]}
        />
    );
}

interface SourceBadgeProps { source: "live" | "mock" }
export function SourceBadge({ source }: SourceBadgeProps) {
    return (
        <Badge
            label={source === "live" ? "Datos reales" : "Datos demo"}
            className={
                source === "live"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
            }
        />
    );
}