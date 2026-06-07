# GYMTEC Admin Web — Arquitectura

## Visión general

```
gymtec_admin_web/
├── admin_frontend/   Next.js 15 + TypeScript + TailwindCSS
└── admin_backend/    FastAPI + Python + Pandas + Scikit-Learn
```

El Admin Web es un producto separado de `gymtec_mvp_basico` (app estudiante).  
Comparte la misma data pipeline pero expone una interfaz para **personal del gimnasio y UTEC**.

---

## Flujo de datos

```
gymtec_mvp_basico/ml_backend/
  data/processed/*.parquet   ──┐
  models_artifacts/*.pkl     ──┤  copiar localmente
  models_artifacts/*.json    ──┘
          │
          ▼
admin_backend/
  data/processed/            ← data_loader.py lee aquí
  models_artifacts/          ← model_service.py lee aquí
          │
          ▼  FastAPI (puerto 8001)
  /api/dashboard/summary
  /api/occupancy/hourly
  /api/occupancy/weekly-heatmap
  /api/recommendations/top-slots
  /api/models/metrics
  /api/data/status
          │
          ▼  Next.js (puerto 3000)
  adminApi.ts  (live/mock fallback)
          │
          ▼
  Dashboard → Ocupación → Recomendaciones → Modelos → Datos → Settings
```

---

## Capas del backend

| Capa       | Archivo                    | Responsabilidad                              |
|------------|----------------------------|----------------------------------------------|
| Router     | `app/api/routers/*.py`     | Definición de endpoints, HTTP                |
| Schema     | `app/schemas/admin.py`     | Contratos Pydantic (request/response)        |
| Service    | `app/services/*.py`        | Lógica de negocio, lectura de archivos       |
| DataLoader | `app/services/data_loader.py` | Abstracción de acceso a parquet/csv/json  |
| Config     | `app/core/config.py`       | Variables de entorno con pydantic-settings   |

---

## Capas del frontend

| Capa       | Carpeta                          | Responsabilidad                         |
|------------|----------------------------------|-----------------------------------------|
| Pages      | `src/app/*/page.tsx`             | Server components, fetch de datos       |
| Layout     | `src/components/layout/`         | AdminShell, Sidebar, Topbar             |
| UI         | `src/components/ui/`             | Card, Badge, Button, MetricCard, states |
| Charts     | `src/components/charts/`         | HourlyOccupancyChart, WeeklyHeatmap     |
| Cards      | `src/components/cards/`          | Cards compuestas por dominio            |
| Services   | `src/services/adminApi.ts`       | Llamadas HTTP con fallback live/mock    |
| Types      | `src/types/admin.ts`             | Todos los tipos TypeScript              |
| Lib        | `src/lib/constants.ts`, `formatters.ts` | Helpers puros                    |
| Data       | `src/data/mockAdminData.ts`      | Mock data alineada con pipeline real    |