import type { OccupancyLevel } from "@/types/admin";
import { OCCUPANCY_HEX, OCCUPANCY_BADGE } from "@/lib/constants";

export function formatPercent(value: number): string {
    return `${value}%`;
}

export function formatDate(value: string): string {
    try {
        return new Date(value + "T00:00:00").toLocaleDateString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return value;
    }
}

export function formatNumber(value: number): string {
    return value.toLocaleString("es-PE");
}

export function formatScore(value: number): string {
    // value 0-1 → show as percentage
    return value <= 1 ? `${Math.round(value * 100)}%` : `${value}%`;
}

export function getOccupancyLevelLabel(level: OccupancyLevel): string {
    const labels: Record<OccupancyLevel, string> = {
        Bajo:    "Aforo Bajo",
        Medio:   "Aforo Medio",
        Alto:    "Aforo Alto",
        Crítico: "Aforo Crítico",
        Cerrado: "Cerrado",
    };
    return labels[level] ?? level;
}

export function getOccupancyLevelColor(level: OccupancyLevel | string): string {
    return OCCUPANCY_HEX[level] ?? "#6B7280";
}

export function getOccupancyLevelBadge(level: OccupancyLevel | string): string {
    return OCCUPANCY_BADGE[level] ?? OCCUPANCY_BADGE["Cerrado"];
}

export function ratioToLevel(ratio: number): OccupancyLevel {
    if (ratio <= 0.5)  return "Bajo";
    if (ratio <= 0.75) return "Medio";
    if (ratio <= 0.9)  return "Alto";
    return "Crítico";
}