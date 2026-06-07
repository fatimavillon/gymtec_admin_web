from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.schemas.admin import HealthResponse
from app.services.data_loader import data_is_loaded
from app.api.routers import dashboard, occupancy, recommendations, models, data_status

app = FastAPI(
    title="GYMTEC Admin API",
    description=(
        "API administrativa del ecosistema GYMTEC — UTEC.\n\n"
        "Lee archivos del pipeline ML (parquet, csv, json) cuando están disponibles "
        "y cae a datos mock cuando no lo están."
    ),
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────

app.include_router(dashboard.router,      prefix="/api", tags=["Dashboard"])
app.include_router(occupancy.router,      prefix="/api", tags=["Ocupación"])
app.include_router(recommendations.router,prefix="/api", tags=["Recomendaciones"])
app.include_router(models.router,         prefix="/api", tags=["Modelos"])
app.include_router(data_status.router,    prefix="/api", tags=["Datos"])

# ─── Health ──────────────────────────────────────────────────────────────────

@app.get("/health", response_model=HealthResponse, tags=["Sistema"])
def health():
    """Verificación de estado del backend admin."""
    return HealthResponse(
        status="ok",
        service="gymtec-admin-backend",
        version="0.1.0",
        data_loaded=data_is_loaded(),
    )