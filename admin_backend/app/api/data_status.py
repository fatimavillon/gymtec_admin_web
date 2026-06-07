from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def get_data_status():
    return {
        "raw_files": 2,
        "processed_files": 5,
        "model_artifacts": 2,
        "last_update": "2026-06-07",
        "status": "ready",
    }