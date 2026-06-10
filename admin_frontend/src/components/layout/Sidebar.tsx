"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    LayoutDashboard, Users, Lightbulb, BrainCircuit,
    Database, Settings, Activity,
} from "lucide-react";

const NAV = [
    { href: "/dashboard",       label: "Dashboard",       Icon: LayoutDashboard },
    { href: "/occupancy",       label: "Ocupación",       Icon: Users },
    { href: "/recommendations", label: "Recomendaciones", Icon: Lightbulb },
    { href: "/models",          label: "Modelos ML",      Icon: BrainCircuit },
    { href: "/data-status",     label: "Estado de Datos", Icon: Database },
    { href: "/settings",        label: "Configuración",   Icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-60 min-h-screen border-r border-slate-800/80 fixed left-0 top-0 bottom-0 z-30"
               style={{ background: "#0d1625" }}>

            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-[18px] border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: "#0040A0" }}>
                    <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-none">GYMTEC</p>
                    <p className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: "#00CCFF" }}>Admin Web</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase px-2 mb-2">
                    Panel
                </p>
                {NAV.map(({ href, label, Icon }) => {
                    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                                active
                                    ? "text-white border"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            )}
                            style={active ? {
                                background: "rgba(0, 64, 160, 0.25)",
                                borderColor: "rgba(0, 64, 160, 0.5)",
                            } : undefined}
                        >
                            <Icon
                                className="w-4 h-4 flex-shrink-0"
                                style={active ? { color: "#00CCFF" } : undefined}
                            />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-800/80">
                <p className="text-[10px] text-slate-600">UTEC · GYMTEC v0.1.0</p>
            </div>
        </aside>
    );
}