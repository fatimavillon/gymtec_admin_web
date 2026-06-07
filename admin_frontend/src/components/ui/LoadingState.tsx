export function LoadingState({ label = "Cargando datos..." }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            </div>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}