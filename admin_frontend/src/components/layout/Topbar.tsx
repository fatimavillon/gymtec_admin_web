"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { checkHealth } from "@/services/adminApi";
import { Button } from "@/components/ui/Button";

export function Topbar() {
    const [connected, setConnected] = useState<boolean | null>(null);
    const [source, setSource]       = useState<"live" | "mock" | null>(null);
    const [checking, setChecking]   = useState(false);
    const [date, setDate]           = useState("");

    const ping = async () => {
        setChecking(true);
        try {
            const result = await checkHealth();
            setConnected(result.source === "live");
            setSource(result.source);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        ping();
        setDate(
            new Date().toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
            <p className="text-xs text-slate-500 capitalize hidden sm:block">{date}</p>

            <div className="flex items-center gap-3 ml-auto">
                {/* Backend status badge */}
                {connected === null ? (
                    <span className="text-xs text-slate-500">Verificando conexión...</span>
                ) : connected ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <Wifi className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] font-medium text-emerald-400">Backend conectado</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <WifiOff className="w-3 h-3 text-amber-400" />
                        <span className="text-[11px] font-medium text-amber-400">
              {source === "mock" ? "Modo demo" : "Sin conexión"}
            </span>
                    </div>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={ping}
                    disabled={checking}
                    title="Actualizar estado"
                >
                    <RefreshCw className={`w-3 h-3 ${checking ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">Actualizar</span>
                </Button>
            </div>
        </header>
    );
}