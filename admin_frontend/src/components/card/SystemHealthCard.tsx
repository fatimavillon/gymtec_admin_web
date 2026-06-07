"use client";
import { useState, useEffect } from "react";
import { getHealth } from "@/services/adminApi";
import type { HealthStatus } from "@/types/admin";
import { Server, CheckCircle, XCircle } from "lucide-react";
import { API_FALLBACK_URL } from "@/lib/constants";

export function SystemHealthCard() {
    const [health, setHealth] = useState<HealthStatus | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        getHealth()
            .then(setHealth)
            .catch(() => setError(true));
    }, []);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? API_FALLBACK_URL;

    return (
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-5 space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center">
                    <Server className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-200">Salud del Sistema</p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span className="text-xs text-slate-400">Backend FastAPI</span>
                    <div className="flex items-center gap-1.5">
                        {error ? (
                            <>
                                <XCircle className="w-3.5 h-3.5 text-red-400" />
                                <span className="text-xs text-red-400">No disponible</span>
                            </>
                        ) : health ? (
                            <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs text-emerald-400">Operativo</span>
                            </>
                        ) : (
                            <span className="text-xs text-slate-500">Verificando...</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-slate-400">URL</span>
                    <span className="text-xs text-slate-300 font-mono">{apiUrl}</span>
                </div>
                {health?.version && (
                    <div className="flex items-center justify-between py-1">
                        <span className="text-xs text-slate-400">Versión</span>
                        <span className="text-xs text-slate-300">{health.version}</span>
                    </div>
                )}
            </div>
        </div>
    );
}