import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    children: ReactNode;
}

export function Button({
                           variant = "primary",
                           size = "md",
                           className,
                           children,
                           ...props
                       }: ButtonProps) {
    return (
        <button
            className={clsx(
                "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
                variant === "primary"   && "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30",
                variant === "secondary" && "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600",
                variant === "ghost"     && "text-slate-400 hover:text-slate-200 hover:bg-slate-800",
                size === "sm" && "px-3 py-1.5 text-xs",
                size === "md" && "px-4 py-2 text-sm",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}