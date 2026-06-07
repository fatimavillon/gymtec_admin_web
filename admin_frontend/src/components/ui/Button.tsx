import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    children: React.ReactNode;
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
                {
                    "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30":
                        variant === "primary",
                    "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600":
                        variant === "secondary",
                    "text-slate-400 hover:text-slate-200 hover:bg-slate-800":
                        variant === "ghost",
                },
                {
                    "px-3 py-1.5 text-xs": size === "sm",
                    "px-4 py-2 text-sm": size === "md",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}