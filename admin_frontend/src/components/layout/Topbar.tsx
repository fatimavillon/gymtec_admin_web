"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { getHealth } from "@/services/adminApi";
import { Button } from "@/components/ui/Button";

export function Topbar() {
    const [connected, setConnected] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const [date, setDate] = useState("");

    const checkHealth = async () => {
        setChecking(true);
        try {
            await getHealth();
            setConnected(true);
        } catch {
            setConnected(false);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        checkHealth();
        setDate(
            new Date().toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, []);

    return (
        <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
            <p className="text-xs text-slate-500 capitalize">{date}</p>

            <div className="flex items-center gap-3">
                {/* Backend status */}
                <div className="flex items-center gap-2">
                    {connected === null ? (
                        <span className="text-xs text-slate-500">Verificando...</span>
                    ) : connected ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <Wifi className="w-3 h-3 text-emerald-400" />
                            <span className="text-[11px] font-medium text-emerald-400">Backend conectado</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                            <WifiOff className="w-3 h-3 text-red-400" />
                            <span className="text-[11px] font-medium text-red-400">Backend no disponible</span>
                        </div>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={checkHealth}
                    disabled={checking}
                    title="Actualizar estado"
                >
                    <RefreshCw className={`w-3 h-3 ${checking ? "animate-spin" : ""}`} />
                    Actualizar
                </Button>
            </div>
        </header>
    );
}