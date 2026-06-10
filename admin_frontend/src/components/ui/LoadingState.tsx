export function LoadingState({ label = "Cargando datos..." }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: "#E5E7EB" }} />
                <div
                    className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "#0040A0", borderTopColor: "transparent" }}
                />
            </div>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>{label}</p>
        </div>
    );
}