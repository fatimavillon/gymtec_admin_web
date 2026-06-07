import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { SystemHealthCard } from "@/components/cards/SystemHealthCard";
import { API_FALLBACK_URL } from "@/lib/constants";
import { Settings, ArrowRight, Info } from "lucide-react";

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
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-slate-800">
                            <span className="text-xs text-slate-400">URL del backend</span>
                            <span className="font-mono text-xs text-cyan-400">{apiUrl}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-800">
                            <span className="text-xs text-slate-400">Modo de datos</span>
                            <span className="text-xs text-slate-200 font-medium">mock-admin</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-800">
                            <span className="text-xs text-slate-400">Versión frontend</span>
                            <span className="text-xs text-slate-200">v0.1.0</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-xs text-slate-400">Documentación API</span>
                            <a
                                href={`${apiUrl}/docs`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                            >
                                Swagger UI
                                <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </Card>

                {/* Health */}
                <SystemHealthCard />
            </div>

            {/* Commands */}
            <Card>
                <CardHeader>
                    <CardTitle>Comandos de inicio</CardTitle>
                    <Info className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-400 mb-2">Backend FastAPI (desde admin_backend/):</p>
                        <pre className="bg-slate-900 rounded-lg border border-slate-700 px-4 py-3 font-mono text-xs text-emerald-400 overflow-x-auto">
              {`.venv\\Scripts\\activate\nuvicorn app.api.main:app --reload --port 8001`}
            </pre>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-2">Frontend Next.js (desde admin_frontend/):</p>
                        <pre className="bg-slate-900 rounded-lg border border-slate-700 px-4 py-3 font-mono text-xs text-blue-400 overflow-x-auto">
              {`npm install\nnpm run dev`}
            </pre>
                    </div>
                </div>
            </Card>

            {/* Roadmap */}
            <Card>
                <CardHeader>
                    <CardTitle>Próximos pasos de integración</CardTitle>
                </CardHeader>
                <div className="space-y-2">
                    {[
                        { step: "Conectar parquet de predicciones procesadas", status: "pending" },
                        { step: "Integrar CSV de recomendaciones desde pipeline Gold", status: "pending" },
                        { step: "Cargar métricas JSON desde entrenamiento de modelos", status: "pending" },
                        { step: "Reemplazar endpoints mock por modelos .pkl reales", status: "pending" },
                        { step: "Conectar datos raw/interim/processed desde ML backend", status: "pending" },
                        { step: "Autenticación de administrador con JWT", status: "pending" },
                    ].map(({ step }, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-800/50 last:border-0">
                            <div className="w-4 h-4 rounded border-2 border-slate-600 flex-shrink-0" />
                            <span className="text-xs text-slate-400">{step}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 italic">
                        Esta versión consume endpoints locales FastAPI con datos mock alineados a la estructura del MVP existente.
                    </p>
                </div>
            </Card>
        </div>
    );
}