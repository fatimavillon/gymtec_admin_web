import { Inbox } from "lucide-react";

interface EmptyStateProps {
  label?: string;
}

export function EmptyState({ label = "Sin datos disponibles" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <Inbox className="w-8 h-8 text-slate-600" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}