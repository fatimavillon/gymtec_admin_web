import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AdminShell } from "@/components/layout/AdminShell";

export const metadata: Metadata = {
    title: "GYMTEC Admin — Panel Administrativo",
    description: "Monitoreo de aforo, modelos ML y operación del gimnasio UTEC",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
        <body>
        <AdminShell>{children}</AdminShell>
        </body>
        </html>
    );
}