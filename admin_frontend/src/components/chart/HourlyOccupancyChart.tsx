"use client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { HourlyOccupancyItem } from "@/types/admin";
import { getOccupancyLevelColor } from "@/lib/formatters";

interface HourlyOccupancyChartProps {
    items: HourlyOccupancyItem[];
}

interface TooltipPayload {
    payload?: {
        hour: string;
        occupancy: number;
        level: string;
    };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
    if (!active || !payload || !payload[0]?.payload) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
            <p className="text-slate-300 font-semibold">{d.hour}</p>
            <p className="text-white font-bold text-base">{d.occupancy}%</p>
            <p style={{ color: getOccupancyLevelColor(d.level as "Bajo" | "Medio" | "Alto" | "Cerrado") }}>
                {d.level}
            </p>
        </div>
    );
}

export function HourlyOccupancyChart({ items }: HourlyOccupancyChartProps) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={items} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="occupancyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis
                    dataKey="hour"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#occupancyGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#3B82F6", stroke: "#1E40AF", strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}