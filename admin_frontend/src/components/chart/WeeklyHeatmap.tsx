import clsx from "clsx";
import type { WeeklyHeatmapResponse, OccupancyLevel } from "@/types/admin";

interface WeeklyHeatmapProps {
    data: WeeklyHeatmapResponse;
}

const cellColor: Record<OccupancyLevel, string> = {
    Bajo: "bg-emerald-500/70 border-emerald-500/20",
    Medio: "bg-amber-500/70 border-amber-500/20",
    Alto: "bg-red-500/70 border-red-500/20",
    Cerrado: "bg-slate-700/40 border-slate-700/20",
};

const textColor: Record<OccupancyLevel, string> = {
    Bajo: "text-emerald-100",
    Medio: "text-amber-100",
    Alto: "text-red-100",
    Cerrado: "text-slate-500",
};

export function WeeklyHeatmap({ data }: WeeklyHeatmapProps) {
    const { days, hours, items } = data;

    const getCell = (day: string, hour: string) =>
        items.find((i) => i.day === day && i.hour === hour);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 min-w-[480px]">
                <thead>
                <tr>
                    <th className="text-[11px] text-slate-500 font-medium text-left pr-3 pb-1 w-10">Hora</th>
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
                        <td className="text-[11px] text-slate-500 pr-3 py-0.5 font-mono">{h}h</td>
                        {days.map((d) => {
                            const cell = getCell(d, h);
                            const level = cell?.level ?? "Cerrado";
                            return (
                                <td key={`${d}-${h}`} className="text-center py-0.5">
                                    <div
                                        title={`${d} ${h}h — ${level} (${cell?.occupancy ?? 0}%)`}
                                        className={clsx(
                                            "mx-auto w-full h-7 rounded border flex items-center justify-center cursor-default transition-opacity hover:opacity-80",
                                            cellColor[level as OccupancyLevel]
                                        )}
                                    >
                                        {cell && (
                                            <span className={clsx("text-[10px] font-medium", textColor[level as OccupancyLevel])}>
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
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Nivel:</span>
                {(["Bajo", "Medio", "Alto", "Cerrado"] as OccupancyLevel[]).map((level) => (
                    <div key={level} className="flex items-center gap-1.5">
                        <div className={clsx("w-3 h-3 rounded border", cellColor[level])} />
                        <span className="text-[11px] text-slate-400">{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}