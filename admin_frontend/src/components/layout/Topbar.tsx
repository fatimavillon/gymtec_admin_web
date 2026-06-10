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
                weekday: "long", year: "numeric", month: "long", day: "numeric",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header
            className="h-14 flex items-center justify-between px-6 sticky top-0 z-20"
            style={{
                background: "#ffffff",
                borderBottom: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
        >
            <p className="text-xs capitalize hidden sm:block" style={{ color: "#9CA3AF" }}>{date}</p>

            <div className="flex items-center gap-3 ml-auto">
                {connected === null ? (
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>Verificando conexión...</span>
                ) : connected ? (
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#55CC22" }} />
                        <Wifi className="w-3 h-3" style={{ color: "#16a34a" }} />
                        <span className="text-[11px] font-medium" style={{ color: "#16a34a" }}>Backend conectado</span>
                    </div>
                ) : (
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
                    >
                        <WifiOff className="w-3 h-3" style={{ color: "#d97706" }} />
                        <span className="text-[11px] font-medium" style={{ color: "#d97706" }}>
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
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                    <RefreshCw className={`w-3 h-3 ${checking ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">Actualizar</span>
                </Button>
            </div>
        </header>
    );
}