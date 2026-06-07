import clsx from "clsx";
import type { WeeklyHeatmapResponse, OccupancyLevel } from "@/types/admin";

interface Props { data: WeeklyHeatmapResponse }

const CELL_COLOR: Record<OccupancyLevel, string> = {
    Bajo:    "bg-emerald-500/70 border-emerald-500/20",
    Medio:   "bg-amber-500/60  border-amber-500/20",
    Alto:    "bg-red-500/70    border-red-500/20",
    Crítico: "bg-red-700/80    border-red-700/20",
    Cerrado: "bg-slate-700/40  border-slate-700/20",
};

const CELL_TEXT: Record<OccupancyLevel, string> = {
    Bajo:    "text-emerald-100",
    Medio:   "text-amber-100",
    Alto:    "text-red-100",
    Crítico: "text-red-50",
    Cerrado: "text-slate-500",
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
                        <th key={d} className="text-[11px] text-slate-400 font-semibold text-center pb-1">
                            {d}
                        </th>
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
                            return (
                                <td key={`${d}-${h}`} className="py-0.5 text-center">
                                    <div
                                        title={`${d} ${h}h — ${level} (${cell?.occupancy ?? 0}%)`}
                                        className={clsx(
                                            "mx-auto w-full h-7 rounded border flex items-center justify-center cursor-default hover:opacity-80 transition-opacity",
                                            CELL_COLOR[level]
                                        )}
                                    >
                                        {cell && (
                                            <span className={clsx("text-[10px] font-medium", CELL_TEXT[level])}>
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
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Nivel:</span>
                {LEVELS.map((level) => (
                    <div key={level} className="flex items-center gap-1.5">
                        <div className={clsx("w-3 h-3 rounded border", CELL_COLOR[level])} />
                        <span className="text-[11px] text-slate-400">{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}