"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Users, Lightbulb, Activity } from "lucide-react";

const NAV = [
    { href: "/dashboard",       label: "Dashboard",       Icon: LayoutDashboard },
    { href: "/occupancy",       label: "Ocupación",       Icon: Users },
    { href: "/recommendations", label: "Recomendaciones", Icon: Lightbulb },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="hidden md:flex flex-col w-60 min-h-screen fixed left-0 top-0 bottom-0 z-30"
            style={{ background: "#06172E", borderRight: "1px solid #0d2244" }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-[18px]" style={{ borderBottom: "1px solid #0d2244" }}>
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#0040A0" }}
                >
                    <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-none">GYMTEC</p>
                    <p className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: "#00CCFF" }}>
                        Admin Web
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                <p
                    className="text-[10px] font-semibold tracking-widest uppercase px-2 mb-2"
                    style={{ color: "#4a6080" }}
                >
                    Panel
                </p>
                {NAV.map(({ href, label, Icon }) => {
                    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                            )}
                            style={
                                active
                                    ? { background: "#0040A0", color: "#ffffff", boxShadow: "0 0 0 1px #00CCFF44" }
                                    : { color: "#94a3b8" }
                            }
                            onMouseEnter={(e) => {
                                if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "#0d2244";
                            }}
                            onMouseLeave={(e) => {
                                if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                            }}
                        >
                            <Icon
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: active ? "#00CCFF" : "inherit" }}
                            />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4" style={{ borderTop: "1px solid #0d2244" }}>
                <p className="text-[10px]" style={{ color: "#2a4060" }}>UTEC · GYMTEC v0.1.0</p>
            </div>
        </aside>
    );
}