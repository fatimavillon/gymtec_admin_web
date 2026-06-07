"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    LayoutDashboard,
    Users,
    Lightbulb,
    BrainCircuit,
    Database,
    Settings,
    Activity,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/occupancy", label: "Ocupación", icon: Users },
    { href: "/recommendations", label: "Recomendaciones", icon: Lightbulb },
    { href: "/models", label: "Modelos ML", icon: BrainCircuit },
    { href: "/data-status", label: "Estado de Datos", icon: Database },
    { href: "/settings", label: "Configuración", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-60 min-h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 bottom-0 z-30">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-none">GYMTEC</p>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">Admin</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase px-2 mb-2">
                    Panel
                </p>
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                                active
                                    ? "bg-blue-600/15 text-blue-400 border border-blue-600/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/70"
                            )}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-600">UTEC · GYMTEC v0.1</p>
            </div>
        </aside>
    );
}