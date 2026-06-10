"use client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
    Dot,
} from "recharts";
import type { HourlyOccupancyItem, OccupancyLevel } from "@/types/admin";
import { GYM_OPERATION_SLOTS } from "@/lib/constants";

interface Props {
    items: HourlyOccupancyItem[];
}

// Color por nivel para los dots y tooltip
const LEVEL_COLOR: Record<OccupancyLevel, string> = {
    Bajo:    "#55CC22",
    Medio:   "#F59E0B",
    Alto:    "#FF4433",
    Crítico: "#DC2626",
    Cerrado: "#9CA3AF",
};

const LEVEL_BG: Record<OccupancyLevel, string> = {
    Bajo:    "#f0fdf4",
    Medio:   "#fffbeb",
    Alto:    "#fef2f2",
    Crítico: "#fef2f2",
    Cerrado: "#f9fafb",
};

// Dot personalizado: cambia color según nivel
function CustomDot(props: {
    cx?: number;
    cy?: number;
    payload?: HourlyOccupancyItem;
    index?: number;
    dataLength?: number;
}) {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || !payload) return null;
    const color = LEVEL_COLOR[payload.level as OccupancyLevel] ?? "#0040A0";
    return (
        <g>
            {/* Halo suave */}
            <circle cx={cx} cy={cy} r={7} fill={color} opacity={0.15} />
            {/* Punto principal */}
            <circle cx={cx} cy={cy} r={4} fill={color} stroke="#ffffff" strokeWidth={2} />
        </g>
    );
}

// Tooltip completamente personalizado
function CustomTooltip({
                           active,
                           payload,
                           label,
                       }: {
    active?: boolean;
    payload?: Array<{ payload: HourlyOccupancyItem }>;
    label?: string;
}) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const color  = LEVEL_COLOR[d.level as OccupancyLevel] ?? "#0040A0";
    const bg     = LEVEL_BG[d.level as OccupancyLevel]    ?? "#ffffff";

    return (
        <div
            style={{
                background: "#ffffff",
                border: `1px solid ${color}`,
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: `0 4px 16px ${color}33`,
                minWidth: 130,
            }}
        >
            <p style={{ color: "#6B7280", fontSize: 11, marginBottom: 4 }}>{label}</p>
            <p style={{ color: "#111827", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                {d.occupancy}
                <span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>%</span>
            </p>
            <div
                style={{
                    marginTop: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: bg,
                    border: `1px solid ${color}55`,
                    borderRadius: 99,
                    padding: "2px 8px",
                }}
            >
                <div
                    style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: color,
                    }}
                />
                <span style={{ fontSize: 11, fontWeight: 600, color }}>{d.level}</span>
            </div>
        </div>
    );
}

// Gradientes por zonas — de verde a rojo según la línea sube
// Usamos un único gradiente de color basado en posición Y
export function HourlyOccupancyChart({ items }: Props) {
    const filtered = items.filter((i) => GYM_OPERATION_SLOTS.includes(i.hour));

    // hora pico para la reference line
    const peak = filtered.reduce<HourlyOccupancyItem | null>(
        (m, i) => (!m || i.occupancy > m.occupancy ? i : m),
        null
    );

    return (
        <div style={{ width: "100%", userSelect: "none" }}>
            <ResponsiveContainer width="100%" height={270}>
                <AreaChart
                    data={filtered}
                    margin={{ top: 12, right: 24, left: -8, bottom: 0 }}
                >
                    <defs>
                        {/* Gradiente principal azul GYMTEC */}
                        <linearGradient id="gymtecGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#0040A0" stopOpacity={0.18} />
                            <stop offset="60%"  stopColor="#00CCFF" stopOpacity={0.10} />
                            <stop offset="100%" stopColor="#00CCFF" stopOpacity={0.0}  />
                        </linearGradient>

                        {/* Zona de referencia para zona crítica (>75%) */}
                        <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#FF4433" stopOpacity={0.08} />
                            <stop offset="100%" stopColor="#FF4433" stopOpacity={0.0}  />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#F3F4F6"
                        vertical={false}
                    />

                    {/* Zona crítica: banda roja suave en 75–100% */}
                    <ReferenceLine
                        y={75}
                        stroke="#FF4433"
                        strokeDasharray="5 3"
                        strokeWidth={1.2}
                        strokeOpacity={0.5}
                        label={{
                            value: "Zona alta",
                            position: "insideTopRight",
                            fontSize: 10,
                            fill: "#FF4433",
                            opacity: 0.7,
                        }}
                    />

                    {/* Línea de hora pico */}
                    {peak && (
                        <ReferenceLine
                            x={peak.hour}
                            stroke="#DDAA66"
                            strokeDasharray="4 3"
                            strokeWidth={1.5}
                            strokeOpacity={0.7}
                            label={{
                                value: "Pico",
                                position: "insideTopRight",
                                fontSize: 10,
                                fill: "#DDAA66",
                            }}
                        />
                    )}

                    <XAxis
                        dataKey="hour"
                        tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                        dy={6}
                    />
                    <YAxis
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                        tickFormatter={(v: number) => `${v}%`}
                        width={38}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#0040A0",
                            strokeWidth: 1,
                            strokeDasharray: "4 3",
                            strokeOpacity: 0.4,
                        }}
                    />

                    {/* Área de relleno */}
                    <Area
                        type="monotoneX"
                        dataKey="occupancy"
                        stroke="url(#strokeGrad)"
                        strokeWidth={0}
                        fill="url(#gymtecGrad)"
                        dot={false}
                        activeDot={false}
                        isAnimationActive={true}
                        animationDuration={900}
                    />

                    {/* Línea principal con stroke gradiente */}
                    <defs>
                        <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%"   stopColor="#0040A0" />
                            <stop offset="50%"  stopColor="#00CCFF" />
                            <stop offset="100%" stopColor="#0040A0" />
                        </linearGradient>
                    </defs>

                    <Area
                        type="monotoneX"
                        dataKey="occupancy"
                        stroke="#0040A0"
                        strokeWidth={2.5}
                        fill="url(#gymtecGrad)"
                        dot={<CustomDot />}
                        activeDot={false}
                        isAnimationActive={true}
                        animationDuration={900}
                        animationEasing="ease-out"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Leyenda de niveles */}
            <div
                style={{
                    display: "flex",
                    gap: 16,
                    justifyContent: "flex-end",
                    paddingRight: 24,
                    marginTop: 4,
                }}
            >
                {(["Bajo", "Medio", "Alto"] as OccupancyLevel[]).map((level) => (
                    <div
                        key={level}
                        style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: LEVEL_COLOR[level],
                            }}
                        />
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}