from app.schemas.admin import RecommendationSlot, RecommendationResponse
from app.services.data_loader import load_recomendaciones

MOCK_ITEMS = [
    RecommendationSlot(rank=1, start_time="15:00", end_time="16:00", score=89, level="Bajo",  reason="Aforo bajo y menor cruce con clases."),
    RecommendationSlot(rank=2, start_time="09:00", end_time="10:00", score=85, level="Bajo",  reason="Franja matutina con baja demanda estimada."),
    RecommendationSlot(rank=3, start_time="16:00", end_time="17:00", score=80, level="Bajo",  reason="Post-almuerzo con menor actividad académica."),
    RecommendationSlot(rank=4, start_time="20:00", end_time="21:00", score=75, level="Medio", reason="Franja nocturna con demanda moderada."),
    RecommendationSlot(rank=5, start_time="10:00", end_time="11:00", score=70, level="Medio", reason="Mañana media con aforo moderado."),
]


def get_top_recommendations() -> RecommendationResponse:
    df = load_recomendaciones()

    if df is not None and not df.empty:
        try:
            score_col = next(
                (c for c in ["score", "recomendacion_score", "score_final"] if c in df.columns), None
            )
            hour_col = next(
                (c for c in ["hora", "hour", "slot_hora"] if c in df.columns), None
            )
            level_col = next(
                (c for c in ["nivel", "level", "nivel_aforo"] if c in df.columns), None
            )
            reason_col = next(
                (c for c in ["razon", "reason", "motivo"] if c in df.columns), None
            )

            if score_col and hour_col:
                top = df.nlargest(5, score_col).reset_index(drop=True)
                items = []
                for i, row in top.iterrows():
                    score_val = row[score_col]
                    score_int = int(score_val * 100 if score_val <= 1 else score_val)
                    hora = str(row[hour_col])
                    start = hora if ":" in hora else f"{hora}:00"
                    hour_num = int(hora.split(":")[0]) if ":" in hora else int(hora)
                    end = f"{hour_num + 1:02d}:00"

                    raw_level = str(row[level_col]).capitalize() if level_col and level_col in row else None
                    level = raw_level if raw_level in ("Bajo", "Medio", "Alto", "Crítico") else "Bajo"

                    reason = str(row[reason_col]) if reason_col and reason_col in row else "Horario recomendado por el modelo."

                    items.append(RecommendationSlot(
                        rank=i + 1,
                        start_time=start,
                        end_time=end,
                        score=score_int,
                        level=level,
                        reason=reason,
                    ))
                return RecommendationResponse(source="live", items=items)
        except Exception:
            pass

    return RecommendationResponse(source="mock", items=MOCK_ITEMS)