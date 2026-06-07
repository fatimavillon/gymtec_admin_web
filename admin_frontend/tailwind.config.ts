import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gymtec: {
                    blue: "#1D4ED8",
                    cyan: "#06B6D4",
                    dark: "#0F172A",
                    card: "#1E293B",
                    border: "#334155",
                    muted: "#64748B",
                    low: "#10B981",
                    medium: "#F59E0B",
                    high: "#EF4444",
                    critical: "#DC2626",
                    closed: "#6B7280",
                },
            },
        },
    },
    plugins: [],
};

export default config;