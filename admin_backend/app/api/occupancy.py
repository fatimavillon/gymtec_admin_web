from fastapi import APIRouter

router = APIRouter()


@router.get("/hourly")
def get_hourly_occupancy():
    return {
        "date": "2026-06-07",
        "items": [
            {"hour": "09:00", "occupancy": 32, "level": "Bajo"},
            {"hour": "10:00", "occupancy": 38, "level": "Bajo"},
            {"hour": "11:00", "occupancy": 55, "level": "Medio"},
            {"hour": "12:00", "occupancy": 82, "level": "Alto"},
            {"hour": "13:00", "occupancy": 88, "level": "Alto"},
            {"hour": "14:00", "occupancy": 70, "level": "Medio"},
            {"hour": "15:00", "occupancy": 30, "level": "Bajo"},
            {"hour": "16:00", "occupancy": 48, "level": "Medio"},
            {"hour": "17:00", "occupancy": 76, "level": "Alto"},
        ],
    }


@router.get("/weekly-heatmap")
def get_weekly_heatmap():
    days = ["L", "M", "X", "J", "V", "S"]
    hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

    items = []
    for day in days:
        for hour in hours:
            level = "Bajo"
            value = 35

            if hour in ["13", "14", "17"]:
                level = "Alto"
                value = 85
            elif hour in ["11", "12", "16"]:
                level = "Medio"
                value = 60

            if day == "S" and hour in ["13", "14", "15", "16", "17", "18"]:
                level = "Cerrado"
                value = 0

            items.append({
                "day": day,
                "hour": hour,
                "occupancy": value,
                "level": level,
            })

    return {
        "days": days,
        "hours": hours,
        "items": items,
    }