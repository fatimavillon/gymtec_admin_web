"use client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({
                               message = "No se pudo conectar con el backend admin. Verifica que FastAPI esté corriendo en http://localhost:8001",
                               onRetry,
                           }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">Error de conexión</p>
                <p className="text-xs text-slate-400 max-w-md">{message}</p>
            </div>
            <div className="bg-slate-900/80 rounded-lg border border-slate-700 px-4 py-2.5 font-mono text-xs text-slate-300">
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