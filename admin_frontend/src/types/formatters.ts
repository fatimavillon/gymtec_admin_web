import type { OccupancyLevel } from "@/types/admin";
import { OCCUPANCY_COLORS, OCCUPANCY_BG } from "@/lib/constants";

export function formatPercent(value: number): string {
    return `${value}%`;
}

export function formatDate(value: string): string {
    try {
        return new Date(value).toLocaleDateString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return value;
    }
}

export function getOccupancyLevelLabel(level: OccupancyLevel): string {
    const labels: Record<OccupancyLevel, string> = {
        Bajo: "Aforo Bajo",
        Medio: "Aforo Medio",
        Alto: "Aforo Alto",
        Cerrado: "Cerrado",
    };
    return labels[level] ?? level;
}

export function getOccupancyLevelColor(level: OccupancyLevel): string {
    return OCCUPANCY_COLORS[level] ?? "#6B7280";
}

export function getOccupancyLevelBadge(level: OccupancyLevel): string {
    return OCCUPANCY_BG[level] ?? OCCUPANCY_BG.Cerrado;
}

export function formatNumber(value: number): string {
    return value.toLocaleString("es-PE");
}

export function formatHour(hour: string): string {
    return hour.includes(":") ? hour : `${hour}:00`;
}