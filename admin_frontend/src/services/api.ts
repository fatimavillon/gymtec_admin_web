import { API_FALLBACK_URL } from "@/lib/constants";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? API_FALLBACK_URL;

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function apiGet<T>(path: string): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            signal: controller.signal,
        });
        if (!res.ok) {
            throw new ApiError(res.status, `${res.status} ${res.statusText} — ${path}`);
        }
        return res.json() as Promise<T>;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(0, `Network error — ${path}`);
    } finally {
        clearTimeout(timeout);
    }
}

export async function apiPost<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new ApiError(res.status, `${res.status} ${res.statusText} — ${path}`);
    }
    return res.json() as Promise<TRes>;
}