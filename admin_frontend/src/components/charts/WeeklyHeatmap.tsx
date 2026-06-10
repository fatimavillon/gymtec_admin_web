import clsx from "clsx";
import type { WeeklyHeatmapResponse, OccupancyLevel } from "@/types/admin";

interface Props { data: WeeklyHeatmapResponse }

// GYMTEC palette — semi-transparent fills over dark background
const CELL_STYLE: Record<OccupancyLevel, { bg: string; text: string; border: string }> = {
    Bajo:    { bg: "rgba(85,204,34,0.55)",   text: "#e8ffe0", border: "rgba(85,204,34,0.3)"   },
    Medio:   { bg: "rgba(221,170,102,0.60)", text: "#fff3d6", border: "rgba(221,170,102,0.3)" },
    Alto:    { bg: "rgba(255,68,51,0.65)",   text: "#ffe8e6", border: "rgba(255,68,51,0.35)"  },
    Crítico: { bg: "rgba(180,20,10,0.75)",   text: "#ffd0cc", border: "rgba(180,20,10,0.4)"   },
    Cerrado: { bg: "rgba(30,35,55,0.60)",    text: "#444455", border: "rgba(50,55,80,0.3)"    },
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
                    <th className="text-[10px] text-slate-500 font-medium text-left pr-2 pb-1 w-8">h</th>
                    {days.map((d) => (
                        <th key={d} className="text-[11px] text-slate-400 font-semibold text-center pb-1">{d}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map((h) => (
                    <tr key={h}>
                        <td className="text-[11px] text-slate-500 pr-2 py-0.5 font-mono">{h}</td>
                        {days.map((d) => {
                            const cell  = getCell(d, h);
                            const level = (cell?.level ?? "Cerrado") as OccupancyLevel;
                            const s     = CELL_STYLE[level];
                            return (
                                <td key={`${d}-${h}`} className="py-0.5 text-center">
                                    <div
                                        title={`${d} ${h}h — ${level}${cell ? ` (${cell.occupancy}%)` : ""}`}
                                        className="mx-auto w-full h-7 rounded flex items-center justify-center cursor-default hover:opacity-80 transition-opacity"
                                        style={{ background: s.bg, border: `1px solid ${s.border}` }}
                                    >
                                        {cell && cell.level !== "Cerrado" && (
                                            <span className="text-[10px] font-semibold" style={{ color: s.text }}>
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
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Nivel:</span>
                {LEVELS.map((level) => {
                    const s = CELL_STYLE[level];
                    return (
                        <div key={level} className="flex items-center gap-1.5">
                            <div
                                className="w-3 h-3 rounded"
                                style={{ background: s.bg, border: `1px solid ${s.border}` }}
                            />
                            <span className="text-[11px] text-slate-400">{level}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}