from fastapi import APIRouter

router = APIRouter()


@router.get("/summary")
def get_dashboard_summary():
    return {
        "current_occupancy_level": "Medio",
        "current_occupancy_value": 62,
        "best_training_hour": "15:00",
        "peak_hour": "13:00",
        "weekly_confidence": 84,
        "students_impacted": 320,
        "data_source": "mock-admin",
    }