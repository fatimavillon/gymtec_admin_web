from datetime import date
from app.schemas.admin import DashboardSummary
from app.services.data_loader import load_predicciones_aforo


def get_dashboard_summary() -> DashboardSummary:
    df = load_predicciones_aforo()

    if df is not None and not df.empty:
        # Try to derive KPIs from real data
        try:
            occ_col = next(
                (c for c in ["aforo_predicho", "ocupacion", "occupancy", "ratio"] if c in df.columns),
                None,
            )
            if occ_col:
                mean_val = int(df[occ_col].mean() * 100 if df[occ_col].mean() <= 1 else df[occ_col].mean())
                level = (
                    "Bajo" if mean_val <= 50
                    else "Medio" if mean_val <= 75
                    else "Alto" if mean_val <= 90
                    else "Crítico"
                )
                return DashboardSummary(
                    current_occupancy_level=level,
                    current_occupancy_value=mean_val,
                    best_training_hour="15:00",
                    peak_hour="13:00",
                    weekly_confidence=84,
                    students_impacted=320,
                    data_source="processed-files",
                    last_update=str(date.today()),
                )
        except Exception:
            pass

    # Mock fallback
    return DashboardSummary(
        current_occupancy_level="Medio",
        current_occupancy_value=62,
        best_training_hour="15:00",
        peak_hour="13:00",
        weekly_confidence=84,
        students_impacted=320,
        data_source="mock",
        last_update=str(date.today()),
    )