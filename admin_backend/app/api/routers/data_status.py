from fastapi import APIRouter
from app.schemas.admin import DataStatus, DataSourcesResponse, AdminMetricsResponse
from app.services.data_status_service import (
    get_data_status,
    get_data_sources,
    get_admin_metrics,
)

router = APIRouter()


@router.get("/data/status", response_model=DataStatus)
def data_status():
    """Conteo de archivos en cada capa del pipeline y estado general."""
    return get_data_status()


@router.get("/data/sources", response_model=DataSourcesResponse)
def data_sources():
    """Lista detallada de fuentes de datos y disponibilidad en disco."""
    return get_data_sources()


@router.get("/admin/metrics", response_model=AdminMetricsResponse)
def admin_metrics():
    """Métricas operativas del sistema admin."""
    return get_admin_metrics()