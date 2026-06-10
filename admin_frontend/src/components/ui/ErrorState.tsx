"use client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps { message?: string; onRetry?: () => void }

export function ErrorState({
                               message = "No se pudo conectar con el backend admin. Verifica que FastAPI esté corriendo en http://localhost:8001",
                               onRetry,
                           }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
            >
                <AlertCircle className="w-6 h-6" style={{ color: "#DC2626" }} />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-semibold" style={{ color: "#111827" }}>Error de conexión</p>
                <p className="text-xs max-w-md" style={{ color: "#6B7280" }}>{message}</p>
            </div>
            <div
                className="rounded-lg px-4 py-2.5 font-mono text-xs"
                style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#374151" }}
            >
                uvicorn app.api.main:app --reload --port 8001
            </div>
            {onRetry && (
                <Button variant="secondary" size="sm" onClick={onRetry}>
                    <RefreshCw className="w-3 h-3" />
                    Reintentar
                </Button>
            )}
        </div>
    );
}