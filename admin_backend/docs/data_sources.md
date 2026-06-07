# Fuentes de Datos — GYMTEC Admin Web

## Pipeline de datos (desde gymtec_mvp_basico)

```
ml_backend/data/
├── raw/
│   ├── log_gym.xlsx                    ← registros de ingreso/salida del gimnasio
│   └── horarios_clases.xlsx            ← horarios académicos UTEC
│
├── interim/
│   ├── horarios_expandido_slots.parquet ← horarios por slot de 30 min
│   ├── horarios_limpios.parquet
│   └── logs_limpios.parquet            ← logs procesados y limpios
│
└── processed/
    ├── aforo_por_slot.parquet           ← aforo real agregado por día/slot
    ├── features_aforo_rf01.parquet      ← features engineered para RF-01
    ├── predicciones_aforo.parquet       ← predicciones RF-01 (aforo por slot)
    ├── predicciones_aforo.csv
    ├── recomendaciones_horario.parquet  ← scores RF-02 (ranking de horarios)
    └── recomendaciones_horario.csv

ml_backend/models_artifacts/
    ├── rf01_aforo_baseline.pkl          ← modelo RandomForestRegressor
    ├── rf01_aforo_metrics.json          ← {"mae": 2.63, "rmse": 3.59, "r2": 0.890}
    ├── rf02_recomendador_score.pkl      ← modelo Ridge
    └── rf02_recomendador_metrics.json   ← {"mae": 0.033, "r2": 0.927, "ndcg_3": 0.998}
```

## Dónde copiarlos en Admin Web

```
admin_backend/
├── data/
│   ├── raw/          ← log_gym.xlsx, horarios_clases.xlsx
│   ├── interim/      ← parquets intermedios
│   └── processed/    ← predicciones_aforo.parquet, recomendaciones_horario.parquet, etc.
└── models_artifacts/ ← *.json (métricas), *.pkl (opcional)
```

## Qué lee el backend admin

| Endpoint                        | Archivo que lee (si existe)              | Fallback  |
|---------------------------------|------------------------------------------|-----------|
| `/api/dashboard/summary`        | `processed/predicciones_aforo.parquet`   | mock      |
| `/api/occupancy/hourly`         | `processed/predicciones_aforo.parquet`   | mock      |
| `/api/occupancy/weekly-heatmap` | mock                                     | mock      |
| `/api/occupancy/heatmap-real`   | `processed/aforo_por_slot.parquet`       | mock      |
| `/api/recommendations/top-slots`| `processed/recomendaciones_horario.parquet` | mock   |
| `/api/models/metrics`           | `models_artifacts/*_metrics.json`        | mock      |
| `/api/data/status`              | cuenta archivos en cada capa             | —         |
| `/api/data/sources`             | verifica existencia de cada archivo      | —         |