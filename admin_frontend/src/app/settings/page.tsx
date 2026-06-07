import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { SystemHealthCard } from "@/components/cards/SystemHealthCard";
import { API_FALLBACK_URL }  from "@/lib/constants";
import { Settings, ArrowRight, Info, GitBranch } from "lucide-react";

export default function SettingsPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? API_FALLBACK_URL;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-100">Configuración</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Parámetros de conexión, estado del sistema e información de integración
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Connection config */}
                <Card>
                    <CardHeader>
                        <CardTitle>Conexión al backend</CardTitle>
                        <Settings className="w-4 h-4 text-slate-500" />
                    </CardHeader>
                    <div className="space-y-1.5 divide-y divide-slate-800">
                        {[
                            { label: "URL del backend",    value: apiUrl,      mono: true },
                            { label: "Modo de datos",      value: "live / mock fallback", mono: false },
                            { label: "Versión frontend",   value: "v0.1.0",    mono: false },
                            { label: "Documentación API",  value: null,        link: `${apiUrl}/docs` },
                        ].map(({ label, value, mono, link }) => (
                            <div key={label} className="flex items-center justify-between py-2">
                                <span className="text-xs text-slate-400">{label}</span>
                                {link ? (
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                                    >
                                        Swagger UI <ArrowRight className="w-3 h-3" />
                                    </a>
                                ) : (
                                    <span className={`text-xs text-slate-300 ${mono ? "font-mono" : "font-medium"}`}>
                    {value}
                  </span>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                <SystemHealthCard />
            </div>

            {/* Commands */}
            <Card>
                <CardHeader>
                    <CardTitle>Comandos de inicio</CardTitle>
                    <Info className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-slate-400 mb-2">Backend FastAPI (desde admin_backend/):</p>
                        <pre className="bg-slate-900 rounded-lg border border-slate-700 px-4 py-3 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
{`python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.api.main:app --reload --port 8001`}
            </pre>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-2">Frontend Next.js (desde admin_frontend/):</p>
                        <pre className="bg-slate-900 rounded-lg border border-slate-700 px-4 py-3 font-mono text-xs text-blue-400 overflow-x-auto whitespace-pre">
{`npm install
npm run dev`}
            </pre>
                    </div>
                </div>
            </Card>

            {/* Roadmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Próximos pasos de integración</CardTitle>
                    <GitBranch className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <div className="divide-y divide-slate-800/50">
                    {[
                        "Copiar data/processed/*.parquet desde gymtec_mvp_basico/ml_backend",
                        "Copiar models_artifacts/*.pkl y *_metrics.json desde gymtec_mvp_basico",
                        "Activar data_loader.py para leer predicciones_aforo.parquet directamente",
                        "Reemplazar servicios mock con servicios que lean archivos reales",
                        "Conectar endpoint /api/occupancy/heatmap-real con aforo_por_slot.parquet",
                        "Agregar autenticación JWT para administradores",
                        "Desplegar en servidor UTEC / Vercel + Railway",
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3 py-2.5">
                            <div className="w-4 h-4 rounded border-2 border-slate-600 flex-shrink-0" />
                            <span className="text-xs text-slate-400">{step}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 italic mt-4 pt-3 border-t border-slate-800">
                    Esta versión consume endpoints locales FastAPI. Los datos live se activan cuando los archivos
                    .parquet/.json están presentes en admin_backend/data y admin_backend/models_artifacts.
                </p>
            </Card>
        </div>
    );
}