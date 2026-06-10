import clsx from "clsx";
import type { WeeklyHeatmapResponse, OccupancyLevel } from "@/types/admin";

interface Props { data: WeeklyHeatmapResponse }

// Vivid GYMTEC palette on white — solid fills with dark text for contrast
const CELL: Record<OccupancyLevel, { bg: string; text: string; border: string }> = {
    Bajo:    { bg: "#55CC22", text: "#1a4a0a", border: "#3da318" },
    Medio:   { bg: "#F59E0B", text: "#5a3a00", border: "#F59E0B" },
    Alto:    { bg: "#FF4433", text: "#ffffff", border: "#dd2211" },
    Crítico: { bg: "#DC2626", text: "#ffffff", border: "#b91c1c" },
    Cerrado: { bg: "#F3F4F6", text: "#9CA3AF", border: "#E5E7EB" },
};

const LEVELS: OccupancyLevel[] = ["Bajo", "Medio", "Alto", "Crítico", "Cerrado"];

export function WeeklyHeatmap({ data }: Props) {
    const { days, hours, items } = data;

    const getCell = (day: string, hour: string) =>
        items.find((i) => i.day === day && i.hour === hour);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 min-w-[500px]">
                <thead>
                <tr>
                    <th
                        className="text-[10px] font-medium text-left pr-2 pb-1 w-8"
                        style={{ color: "#9CA3AF" }}
                    >
                        h
                    </th>
                    {days.map((d) => (
                        <th
                            key={d}
                            className="text-[11px] font-bold text-center pb-1"
                            style={{ color: "#6B7280" }}
                        >
                            {d}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map((h) => (
                    <tr key={h}>
                        <td
                            className="text-[11px] pr-2 py-0.5 font-mono"
                            style={{ color: "#9CA3AF" }}
                        >
                            {h}
                        </td>
                        {days.map((d) => {
                            const cell  = getCell(d, h);
                            const level = (cell?.level ?? "Cerrado") as OccupancyLevel;
                            const s     = CELL[level];
                            return (
                                <td key={`${d}-${h}`} className="py-0.5 text-center">
                                    <div
                                        title={`${d} ${h}h — ${level}${cell ? ` (${cell.occupancy}%)` : ""}`}
                                        className="mx-auto w-full h-7 rounded flex items-center justify-center cursor-default transition-opacity hover:opacity-80"
                                        style={{ background: s.bg, border: `1px solid ${s.border}` }}
                                    >
                                        {cell && level !== "Cerrado" && (
                                            <span
                                                className="text-[10px] font-bold"
                                                style={{ color: s.text }}
                                            >
                          {cell.occupancy}
                        </span>
                                        )}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Legend */}
            <div
                className="flex flex-wrap items-center gap-4 mt-4 pt-3"
                style={{ borderTop: "1px solid #F3F4F6" }}
            >
        <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "#9CA3AF" }}
        >
          Nivel:
        </span>
                {LEVELS.map((level) => {
                    const s = CELL[level];
                    return (
                        <div key={level} className="flex items-center gap-1.5">
                            <div
                                className="w-3 h-3 rounded"
                                style={{ background: s.bg, border: `1px solid ${s.border}` }}
                            />
                            <span className="text-[11px]" style={{ color: "#6B7280" }}>{level}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}