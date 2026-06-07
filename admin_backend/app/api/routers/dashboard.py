from fastapi import APIRouter
from app.schemas.admin import DashboardSummary
from app.services.dashboard_service import get_dashboard_summary

router = APIRouter()


@router.get("/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary():
    """Resumen ejecutivo del estado actual del gimnasio."""
    return get_dashboard_summary()