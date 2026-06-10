"use client";
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { HourlyOccupancyItem, OccupancyLevel } from "@/types/admin";
import { getOccupancyLevelColor } from "@/lib/formatters";
import { GYM_OPERATION_SLOTS } from "@/lib/constants";

interface Props { items: HourlyOccupancyItem[] }

interface TTPayload {
    payload?: { hour: string; occupancy: number; level: OccupancyLevel };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TTPayload[] }) {
    if (!active || !payload?.[0]?.payload) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
            <p className="text-slate-300 font-semibold">{d.hour}</p>
            <p className="text-white font-bold text-base">{d.occupancy}%</p>
            <p style={{ color: getOccupancyLevelColor(d.level) }}>{d.level}</p>
        </div>
    );
}

export function HourlyOccupancyChart({ items }: Props) {
    // Filter to operation hours only
    const filtered = items.filter((i) => GYM_OPERATION_SLOTS.includes(i.hour));

    return (
        <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={filtered} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#00CCFF" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#00CCFF" stopOpacity={0}    />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" vertical={false} />
                <XAxis
                    dataKey="hour"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                />
                <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#00CCFF"
                    strokeWidth={2}
                    fill="url(#cyanGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#00CCFF", stroke: "#0040A0", strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}