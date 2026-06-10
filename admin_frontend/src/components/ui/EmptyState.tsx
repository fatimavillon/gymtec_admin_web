import { Inbox } from "lucide-react";
interface EmptyStateProps { label?: string }
export function EmptyState({ label = "Sin datos disponibles" }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Inbox className="w-8 h-8" style={{ color: "#D1D5DB" }} />
            <p className="text-sm" style={{ color: "#9CA3AF" }}>{label}</p>
        </div>
    );
}