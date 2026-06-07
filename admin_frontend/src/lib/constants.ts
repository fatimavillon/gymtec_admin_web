export const APP_NAME = "GYMTEC Admin";
export const APP_VERSION = "0.1.0";
export const API_FALLBACK_URL = "http://localhost:8001";

export const NAV_ITEMS = [
    { href: "/dashboard",       label: "Dashboard",        icon: "LayoutDashboard" },
    { href: "/occupancy",       label: "Ocupación",        icon: "Users" },
    { href: "/recommendations", label: "Recomendaciones",  icon: "Lightbulb" },
    { href: "/models",          label: "Modelos ML",       icon: "BrainCircuit" },
    { href: "/data-status",     label: "Estado de Datos",  icon: "Database" },
    { href: "/settings",        label: "Configuración",    icon: "Settings" },
] as const;

export const OCCUPANCY_HEX: Record<string, string> = {
    Bajo:    "#10B981",
    Medio:   "#F59E0B",
    Alto:    "#EF4444",
    Crítico: "#DC2626",
    Cerrado: "#6B7280",
};

export const OCCUPANCY_BADGE: Record<string, string> = {
    Bajo:    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Medio:   "bg-amber-500/20  text-amber-400  border-amber-500/30",
    Alto:    "bg-red-500/20    text-red-400    border-red-500/30",
    Crítico: "bg-red-700/20    text-red-300    border-red-700/30",
    Cerrado: "bg-slate-500/20  text-slate-400  border-slate-500/30",
};

export const STATUS_BADGE: Record<string, string> = {
    ready:       "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    available:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    processing:  "bg-amber-500/20  text-amber-400  border-amber-500/30",
    training:    "bg-blue-500/20   text-blue-400   border-blue-500/30",
    error:       "bg-red-500/20    text-red-400    border-red-500/30",
    unavailable: "bg-slate-500/20  text-slate-400  border-slate-500/30",
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
    raw:       "bg-slate-700/50  text-slate-300  border-slate-600/30",
    interim:   "bg-blue-500/10   text-blue-400   border-blue-500/20",
    processed: "bg-amber-500/10  text-amber-400  border-amber-500/20",
    artifact:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
};