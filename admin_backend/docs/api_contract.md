# GYMTEC Admin API — Contratos

Base URL: `http://localhost:8001`  
Swagger:  `http://localhost:8001/docs`

---

## GET /health

```json
{
  "status": "ok",
  "service": "gymtec-admin-backend",
  "version": "0.1.0",
  "data_loaded": true
}
```

---

## GET /api/dashboard/summary

```json
{
  "current_occupancy_level": "Medio",
  "current_occupancy_value": 62,
  "best_training_hour": "15:00",
  "peak_hour": "13:00",
  "weekly_confidence": 84,
  "students_impacted": 320,
  "data_source": "processed-files",
  "last_update": "2026-06-07"
}
```

`data_source` puede ser `"processed-files"` (datos reales) o `"mock"`.

---

## GET /api/occupancy/hourly

```json
{
  "date": "2026-06-07",
  "source": "live",
  "items": [
    { "hour": "09:00", "occupancy": 32, "level": "Bajo", "ratio": 0.32 },
    { "hour": "13:00", "occupancy": 85, "level": "Alto", "ratio": 0.85 }
  ]
}
```

---

## GET /api/occupancy/weekly-heatmap

```json
{
  "days":  ["L","M","X","J","V","S"],
  "hours": ["09","10","11","12","13","14","15","16","17","18"],
  "items": [
    { "day": "L", "hour": "09", "occupancy": 32, "level": "Bajo" }
  ]
}
```

---

## GET /api/occupancy/heatmap-real

Mismo esquema que `weekly-heatmap` pero calculado desde `aforo_por_slot.parquet`.  
Si el archivo no existe, devuelve el mismo resultado que `weekly-heatmap`.

---

## GET /api/recommendations/top-slots

```json
{
  "source": "live",
  "items": [
    {
      "rank": 1,
      "start_time": "15:00",
      "end_time": "16:00",
      "score": 89,
      "level": "Bajo",
      "reason": "Aforo bajo y menor cruce con clases."
    }
  ]
}
```

---

## GET /api/models/metrics

```json
{
  "models": [
    {
      "name": "rf01_aforo_baseline",
      "type": "Random Forest Regressor",
      "status": "available",
      "metric_name": "R²",
      "metric_value": 0.89,
      "description": "Predice el aforo del gimnasio por día y slot horario."
    },
    {
      "name": "rf02_recomendador_score",
      "type": "Ridge Regressor",
      "status": "available",
      "metric_name": "NDCG@3",
      "metric_value": 0.998,
      "description": "Ordena y puntúa los mejores horarios recomendados."
    }
  ]
}
```

---

## GET /api/data/status

```json
{
  "raw_files": 2,
  "interim_files": 3,
  "processed_files": 6,
  "model_artifacts": 4,
  "last_update": "2026-06-07",
  "status": "ready"
}
```

---

## GET /api/data/sources

```json
{
  "sources": [
    {
      "name": "predicciones_aforo.parquet",
      "layer": "processed",
      "description": "Predicciones de aforo generadas por RF-01",
      "required": true,
      "available": true
    }
  ]
}
```

---

## GET /api/admin/metrics

```json
{
  "total_predictions": 97000,
  "total_recommendations": 4850,
  "pipeline_runs": 12,
  "last_pipeline_run": "2026-06-07"
}
```

---

## Niveles de ocupación

| Nivel    | Ratio          | Descripción              |
|----------|----------------|--------------------------|
| Bajo     | ≤ 0.50         | Gimnasio disponible      |
| Medio    | 0.51 – 0.75    | Demanda moderada         |
| Alto     | 0.76 – 0.90    | Alta demanda             |
| Crítico  | > 0.90         | Capacidad casi llena     |
| Cerrado  | —              | Fuera de horario         |