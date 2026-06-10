export const APP_NAME = "GYMTEC Admin";
export const APP_VERSION = "0.1.0";
export const API_FALLBACK_URL = "http://localhost:8001";

// ─── Horario operativo ────────────────────────────────────────────────────────
export const GYM_OPERATION_HOURS = { start: 9, end: 18 };
export const GYM_OPERATION_SLOTS = [
    "09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00",
];
export const GYM_HEATMAP_HOURS = ["09","10","11","12","13","14","15","16","17","18"];
export const SAT_CLOSED_AFTER = 13;

// ─── Sidebar nav — sólo 3 secciones visibles ─────────────────────────────────
export const NAV_ITEMS = [
    { href: "/dashboard",       label: "Dashboard",       icon: "LayoutDashboard" },
    { href: "/occupancy",       label: "Ocupación",       icon: "Users" },
    { href: "/recommendations", label: "Recomendaciones", icon: "Lightbulb" },
] as const;

// ─── Paleta GYMTEC (light mode) ───────────────────────────────────────────────
export const OCCUPANCY_HEX: Record<string, string> = {
    Bajo:    "#55CC22",
    Medio:   "#F59E0B",
    Alto:    "#FF4433",
    Crítico: "#DC2626",
    Cerrado: "#9CA3AF",
};

// Badges: texto oscuro sobre fondo pastel para legibilidad en light mode
export const OCCUPANCY_BADGE: Record<string, string> = {
    Bajo:    "bg-green-100  text-green-700  border-green-200",
    Medio:   "bg-amber-100  text-amber-700  border-amber-200",
    Alto:    "bg-red-100    text-red-600    border-red-200",
    Crítico: "bg-red-200    text-red-700    border-red-300",
    Cerrado: "bg-gray-100   text-gray-500   border-gray-200",
};

export const STATUS_BADGE: Record<string, string> = {
    ready:       "bg-green-100  text-green-700  border-green-200",
    available:   "bg-green-100  text-green-700  border-green-200",
    processing:  "bg-amber-100  text-amber-700  border-amber-200",
    training:    "bg-blue-100   text-blue-700   border-blue-200",
    error:       "bg-red-100    text-red-600    border-red-200",
    unavailable: "bg-gray-100   text-gray-500   border-gray-200",
};

export const STATUS_LABELS: Record<string, string> = {
    ready:       "Listo",
    available:   "Disponible",
    processing:  "Procesando",
    training:    "Entrenando",
    error:       "Error",
    unavailable: "No disponible",
};

export const LAYER_BADGE: Record<string, string> = {
    raw:       "bg-gray-100   text-gray-600   border-gray-200",
    interim:   "bg-blue-100   text-blue-700   border-blue-200",
    processed: "bg-amber-100  text-amber-700  border-amber-200",
    artifact:  "bg-purple-100 text-purple-700 border-purple-200",
};