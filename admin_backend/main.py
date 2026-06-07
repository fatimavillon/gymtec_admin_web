from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from app.api.routers.admin import router as admin_router
from app.schemas.admin import HealthResponse

app = FastAPI(
    title="GYMTEC Admin API",
    description="API administrativa del ecosistema GYMTEC — UTEC",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router, prefix="/api")


@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok",
        version="0.1.0",
        timestamp=datetime.utcnow().isoformat(),
    )