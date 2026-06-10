import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrainerSatisfactionCard }     from "@/components/cards/TrainerSatisfactionCard";
import { ExperienceMetricCard }        from "@/components/cards/ExperienceMetricCard";
import { FeedbackInsightsCard }        from "@/components/cards/FeedbackInsightsCard";
import type { TrainerFeedback, GymExperienceFeedback } from "@/types/feedback";
import { QrCode } from "lucide-react";

// ─── Mock data (future: GET /api/feedback/trainers) ──────────────────────────

const TRAINERS: TrainerFeedback[] = [
    {
        id:           "alfonso",
        name:         "Alfonso",
        rating:       4.7,
        responses:    86,
        satisfaction: 94,
        breakdown:    { very_satisfied: 72, satisfied: 22, neutral: 4, dissatisfied: 2 },
        lastComment:  "Muy atento corrigiendo técnica, siempre pendiente de la postura.",
    },
    {
        id:           "manu",
        name:         "Manu",
        rating:       4.5,
        responses:    74,
        satisfaction: 90,
        breakdown:    { very_satisfied: 65, satisfied: 25, neutral: 7, dissatisfied: 3 },
        lastComment:  "Buen acompañamiento durante la rutina, muy motivador.",
    },
];

// ─── Mock data (future: GET /api/feedback/experience) ────────────────────────

const EXPERIENCE: GymExperienceFeedback = {
    nps: 62,
    metrics: [
        { key: "csat",          label: "CSAT General",             value: 88,  max: 100, unit: "%" },
        { key: "cleanliness",   label: "Limpieza",                 value: 4.4, max: 5,   unit: "/5" },
        { key: "order",         label: "Orden",                    value: 4.2, max: 5,   unit: "/5" },
        { key: "attention",     label: "Atención general",         value: 4.6, max: 5,   unit: "/5" },
        { key: "machines",      label: "Estado de máquinas",       value: 4.1, max: 5,   unit: "/5" },
        { key: "availability",  label: "Disponibilidad máquinas",  value: 3.9, max: 5,   unit: "/5" },
        { key: "atmosphere",    label: "Ambiente general",         value: 4.5, max: 5,   unit: "/5" },
    ],
};

const INSIGHTS: string[] = [
    "La disponibilidad de máquinas es el punto con menor score (3.9/5). Se recomienda revisar rotación en horas pico.",
    "La atención de entrenadores mantiene satisfacción alta — Alfonso lidera con 94%.",
    "Se recomienda reforzar orden y organización en franjas de mayor demanda (12:00–14:00).",
    "El NPS de 62 indica promotores activos; incentivar reseñas públicas puede amplificar el alcance.",
];

// ─── Color helper for metrics ─────────────────────────────────────────────────

function metricColor(value: number, max: number): string {
    const pct = (value / max) * 100;
    if (pct >= 85) return "#55CC22";
    if (pct >= 70) return "#DDAA66";
    return "#FF4433";
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RecommendationsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Recomendaciones de alumnos</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Feedback recogido mediante QR en el gimnasio · Datos de demostración
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50">
                    <QrCode className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] text-slate-400">Encuestas QR</span>
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium bg-amber-500/20 text-amber-400 border-amber-500/30">
            Demo
          </span>
                </div>
            </div>

            {/* ── SECCIÓN 1: Entrenadores ──────────────────────────────────────────── */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-slate-200">
                        Satisfacción con entrenadores
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Resultados de encuestas escaneadas por QR dentro del gimnasio
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TRAINERS.map((t) => (
                        <TrainerSatisfactionCard key={t.id} trainer={t} />
                    ))}
                </div>
            </section>

            {/* ── SECCIÓN 2: Experiencia general ──────────────────────────────────── */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-slate-200">
                        Experiencia general del gimnasio
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Indicadores de satisfacción recogidos en encuestas de salida
                    </p>
                </div>

                {/* NPS highlight */}
                <Card>
                    <CardHeader>
                        <CardTitle>Net Promoter Score (NPS)</CardTitle>
                    </CardHeader>
                    <div className="flex items-center gap-6">
                        <div className="text-center flex-shrink-0">
                            <p className="text-5xl font-black" style={{ color: "#00CCFF" }}>
                                {EXPERIENCE.nps}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">NPS global</p>
                        </div>
                        <div className="flex-1 space-y-1 text-xs text-slate-400">
                            <p>
                                <span className="font-semibold" style={{ color: "#55CC22" }}>NPS &gt; 50</span> se considera excelente.
                                El gimnasio se encuentra en zona positiva.
                            </p>
                            <p>
                                Basado en la pregunta: &ldquo;¿Recomendarías el gimnasio UTEC a un amigo?&rdquo;
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {EXPERIENCE.metrics.map((m) => (
                        <ExperienceMetricCard
                            key={m.key}
                            label={m.label}
                            value={m.value}
                            max={m.max}
                            unit={m.unit}
                            color={metricColor(m.value, m.max)}
                        />
                    ))}
                </div>
            </section>

            {/* ── SECCIÓN 3: Insights accionables ─────────────────────────────────── */}
            <FeedbackInsightsCard insights={INSIGHTS} />

            {/* Future integration note */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/30 px-4 py-3">
                <p className="text-[11px] text-slate-500">
                    <span className="font-mono text-slate-400">GET /api/feedback/trainers</span> ·{" "}
                    <span className="font-mono text-slate-400">GET /api/feedback/experience</span>
                    {" "}— endpoints disponibles para integración futura con sistema de encuestas QR.
                </p>
            </div>
        </div>
    );
}