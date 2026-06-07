import type { Metadata } from "next";
import "./globals.css";
import { AdminShell } from "@/components/layout/AdminShell";

export const metadata: Metadata = {
    title: "GYMTEC Admin — Panel Administrativo",
    description: "Monitoreo de aforo, predicción y recomendaciones operativas del gimnasio UTEC",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
        <body>
        <AdminShell>{children}</AdminShell>
        </body>
        </html>
    );
}