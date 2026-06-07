import clsx from "clsx";
import type { OccupancyLevel } from "@/types/admin";
import { getOccupancyLevelBadge } from "@/lib/formatters";
import { STATUS_BADGE, STATUS_LABELS } from "@/lib/constants";

interface BadgeProps {
    label: string;
    className?: string;
}

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

// ─── Occupancy badge ─────────────────────────────────────────────────────────

interface OccupancyBadgeProps { level: OccupancyLevel }

export function OccupancyBadge({ level }: OccupancyBadgeProps) {
    return <Badge label={level} className={getOccupancyLevelBadge(level)} />;
}

// ─── Status badge ────────────────────────────────────────────────────────────

interface StatusBadgeProps {
    status: "ready" | "processing" | "error" | "available" | "unavailable" | "training";
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <Badge
            label={STATUS_LABELS[status] ?? status}
            className={STATUS_BADGE[status] ?? STATUS_BADGE["error"]}
        />
    );
}

// ─── Source badge (live / mock) ───────────────────────────────────────────────

interface SourceBadgeProps { source: "live" | "mock" }

export function SourceBadge({ source }: SourceBadgeProps) {
    return (
        <Badge
            label={source === "live" ? "Datos reales" : "Datos demo"}
            className={
                source === "live"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            }
        />
    );
}