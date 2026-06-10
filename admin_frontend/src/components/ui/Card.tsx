import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={clsx("rounded-xl p-5", className)}
            style={{
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
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
            className={clsx("text-sm font-semibold uppercase tracking-wider", className)}
            style={{ color: "#6B7280" }}
        >
            {children}
        </h3>
    );
}