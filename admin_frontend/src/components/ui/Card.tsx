import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
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
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={clsx("mb-4 flex items-center justify-between gap-3", className)}>
            {children}
        </div>
    );
}

export function CardTitle({
                              children,
                              className,
                          }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <h3
            className={clsx(
                "text-sm font-semibold uppercase tracking-wider text-slate-300",
                className
            )}
        >
            {children}
        </h3>
    );
}