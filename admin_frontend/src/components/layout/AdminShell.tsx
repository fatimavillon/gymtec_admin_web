import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface AdminShellProps {
    children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Sidebar />
            <div className="md:pl-60 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}