import clsx from "clsx";
import type { OccupancyLevel } from "@/types/admin";
import { getOccupancyLevelBadge } from "@/lib/formatters";

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

interface OccupancyBadgeProps {
    level: OccupancyLevel;
}

export function OccupancyBadge({ level }: OccupancyBadgeProps) {
    return (
        <Badge
            label={level}
            className={getOccupancyLevelBadge(level)}
        />
    );
}

interface StatusBadgeProps {
    status: "ready" | "processing" | "error" | "available" | "unavailable" | "training";
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const styles: Record<string, string> = {
        ready: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        processing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        training: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        error: "bg-red-500/20 text-red-400 border-red-500/30",
        unavailable: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    const labels: Record<string, string> = {
        ready: "Listo",
        available: "Disponible",
        processing: "Procesando",
        training: "Entrenando",
        error: "Error",
        unavailable: "No disponible",
    };
    return (
        <Badge label={labels[status] ?? status} className={styles[status] ?? styles.error} />
    );
}