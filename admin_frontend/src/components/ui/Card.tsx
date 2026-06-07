import clsx from "clsx";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={clsx(
                "rounded-xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-5",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({
                               children,
                               className,
                           }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={clsx("mb-4 flex items-center justify-between", className)}>
            {children}
        </div>
    );
}

export function CardTitle({
                              children,
                              className,
                          }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3 className={clsx("text-sm font-semibold text-slate-300 uppercase tracking-wider", className)}>
            {children}
        </h3>
    );
}