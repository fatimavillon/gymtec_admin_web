export const APP_NAME = "GYMTEC Admin";
export const API_FALLBACK_URL = "http://localhost:8001";

export const NAV_ITEMS = [
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/occupancy", label: "Ocupación", icon: "Users" },
    { href: "/recommendations", label: "Recomendaciones", icon: "Lightbulb" },
    { href: "/models", label: "Modelos ML", icon: "BrainCircuit" },
    { href: "/data-status", label: "Estado de Datos", icon: "Database" },
    { href: "/settings", label: "Configuración", icon: "Settings" },
] as const;

export const OCCUPANCY_COLORS = {
    Bajo: "#10B981",
    Medio: "#F59E0B",
    Alto: "#EF4444",
    Cerrado: "#6B7280",
} as const;

export const OCCUPANCY_BG = {
    Bajo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Medio: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Alto: "bg-red-500/20 text-red-400 border-red-500/30",
    Cerrado: "bg-gray-500/20 text-gray-400 border-gray-500/30",
} as const;