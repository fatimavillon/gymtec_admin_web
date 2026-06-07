import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AdminShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Sidebar />
            <div className="md:pl-60 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6 max-w-screen-2xl">{children}</main>
            </div>
        </div>
    );
}