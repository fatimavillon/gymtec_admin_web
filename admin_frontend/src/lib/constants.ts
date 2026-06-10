export const APP_NAME = "GYMTEC Admin";
export const APP_VERSION = "0.1.0";
export const API_FALLBACK_URL = "http://localhost:8001";

// ─── Horario operativo del gimnasio ──────────────────────────────────────────

export const GYM_OPERATION_HOURS = {
    start: 9,
    end: 18,
};

export const GYM_OPERATION_SLOTS = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00",
];

// Horas del heatmap como strings "09", "10", …
export const GYM_HEATMAP_HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

// Sábado: cerrado después de esta hora (inclusive)
export const SAT_CLOSED_AFTER = 13; // >= 14h → Cerrado

// ─── Navegación ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
    { href: "/dashboard",       label: "Dashboard",        icon: "LayoutDashboard" },
    { href: "/occupancy",       label: "Ocupación",        icon: "Users" },
    { href: "/recommendations", label: "Recomendaciones",  icon: "Lightbulb" },
    { href: "/models",          label: "Modelos ML",       icon: "BrainCircuit" },
    { href: "/data-status",     label: "Estado de Datos",  icon: "Database" },
    { href: "/settings",        label: "Configuración",    icon: "Settings" },
] as const;

// ─── Paleta GYMTEC ────────────────────────────────────────────────────────────
// UTEC Blue: #0040A0 | Tech Cyan: #00CCFF | Wellbeing Green: #55CC22
// University Gold: #DDAA66 | Alert Coral: #FF4433 | Neutral Grey: #C0C0C0

export const OCCUPANCY_HEX: Record<string, string> = {
    Bajo:    "#55CC22",   // Wellbeing Green
    Medio:   "#DDAA66",  // University Gold
    Alto:    "#FF4433",  // Alert Coral
    Crítico: "#CC2211",  // Alert Coral darker
    Cerrado: "#444455",  // Dark neutral
};

export const OCCUPANCY_BADGE: Record<string, string> = {
    Bajo:    "bg-[#55CC22]/20 text-[#55CC22] border-[#55CC22]/30",
    Medio:   "bg-[#DDAA66]/20 text-[#DDAA66] border-[#DDAA66]/30",
    Alto:    "bg-[#FF4433]/20 text-[#FF4433] border-[#FF4433]/30",
    Crítico: "bg-[#CC2211]/20 text-[#FF4433] border-[#CC2211]/30",
    Cerrado: "bg-slate-700/30 text-slate-400  border-slate-600/30",
};

export const STATUS_BADGE: Record<string, string> = {
    ready:       "bg-[#55CC22]/20 text-[#55CC22] border-[#55CC22]/30",
    available:   "bg-[#55CC22]/20 text-[#55CC22] border-[#55CC22]/30",
    processing:  "bg-[#DDAA66]/20 text-[#DDAA66] border-[#DDAA66]/30",
    training:    "bg-[#00CCFF]/20 text-[#00CCFF] border-[#00CCFF]/30",
    error:       "bg-[#FF4433]/20 text-[#FF4433] border-[#FF4433]/30",
    unavailable: "bg-slate-700/30 text-slate-400  border-slate-600/30",
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
    interim:   "bg-[#00CCFF]/10  text-[#00CCFF]  border-[#00CCFF]/20",
    processed: "bg-[#DDAA66]/10  text-[#DDAA66]  border-[#DDAA66]/20",
    artifact:  "bg-[#0040A0]/20  text-[#00CCFF]  border-[#0040A0]/30",
};
