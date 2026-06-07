from fastapi import APIRouter

router = APIRouter()


@router.get("/top-slots")
def get_top_slots():
    return {
        "items": [
            {
                "rank": 1,
                "start_time": "15:00",
                "end_time": "16:00",
                "score": 89,
                "level": "Bajo",
                "reason": "Aforo bajo y menor cruce con clases.",
            },
            {
                "rank": 2,
                "start_time": "10:00",
                "end_time": "11:00",
                "score": 84,
                "level": "Bajo",
                "reason": "Buena disponibilidad y demanda moderada.",
            },
            {
                "rank": 3,
                "start_time": "13:00",
                "end_time": "14:00",
                "score": 76,
                "level": "Medio",
                "reason": "Horario aceptable, aunque con mayor demanda.",
            },
        ],
    }