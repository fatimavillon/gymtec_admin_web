import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    children: ReactNode;
}

export function Button({
                           variant = "primary", size = "md", className, children, ...props
                       }: ButtonProps) {
    return (
        <button
            className={clsx(
                "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
                variant === "primary"   && "text-white shadow-sm",
                variant === "secondary" && "border",
                variant === "ghost"     && "hover:bg-gray-100",
                size === "sm" && "px-3 py-1.5 text-xs",
                size === "md" && "px-4 py-2 text-sm",
                className
            )}
            style={
                variant === "primary"
                    ? { background: "#0040A0", color: "#fff" }
                    : variant === "secondary"
                        ? { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }
                        : { color: "#6B7280" }
            }
            {...props}
        >
            {children}
        </button>
    );
}