from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dashboard, occupancy, recommendations, models, data_status
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "gymtec-admin-backend",
    }


app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(occupancy.router, prefix="/api/occupancy", tags=["Occupancy"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(models.router, prefix="/api/models", tags=["Models"])
app.include_router(data_status.router, prefix="/api/data", tags=["Data Status"])