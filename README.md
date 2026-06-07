# GYMTEC Admin Web

Panel administrativo web del ecosistema **GYMTEC** — plataforma de predicción de aforo y recomendación inteligente de horarios para el gimnasio de **UTEC**.

> Este repositorio es independiente de `gymtec_mvp_basico` (app estudiante).  
> El MVP estudiante recomienda cuándo ir a entrenar.  
> **El Admin Web monitorea y gestiona la operación del gimnasio.**

---

## ¿Qué es GYMTEC Admin Web?

Una interfaz web para **administradores del gimnasio y personal de UTEC** que permite:

- Ver el aforo esperado por hora y por día
- Monitorear el heatmap semanal de demanda
- Consultar las recomendaciones globales del modelo
- Revisar el estado de los modelos ML (RF-01, RF-02)
- Verificar el estado del pipeline de datos
- Conectarse a los archivos reales del MVP cuando están disponibles

---

## Diferencia con gymtec_mvp_basico

| Feature                     | App Estudiante (`gymtec_mvp_basico`) | Admin Web (`gymtec_admin_web`) |
|-----------------------------|--------------------------------------|-------------------------------|
| Usuario objetivo            | Alumno UTEC                          | Personal del gimnasio / UTEC  |
| Pregunta que responde       | ¿Cuándo me conviene ir?              | ¿Cómo opera el gimnasio?      |
| Interfaz                    | App móvil / web responsive           | Dashboard web desktop         |
| Datos que muestra           | Recomendación personalizada          | Analítica global y modelos    |
| Autenticación               | Perfil de alumno                     | Credenciales de administrador |

---

## Estructura del repositorio

```
gymtec_admin_web/
├── admin_frontend/        Next.js 15 + TypeScript + TailwindCSS
├── admin_backend/         FastAPI + Python + Pandas
├── docs/                  Arquitectura, contratos, setup, roadmap
├── README.md
└── .gitignore
```

---

## Cómo levantar el backend

```bash
cd admin_backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn app.api.main:app --reload --port 8001
```

- API:     http://localhost:8001/health
- Swagger: http://localhost:8001/docs

---

## Cómo levantar el frontend

```bash
cd admin_frontend
npm install
npm run dev
```

- URL: http://localhost:3000 → redirige a `/dashboard`

---

## Endpoints que consume el frontend

| Endpoint                           | Descripción                                |
|------------------------------------|--------------------------------------------|
| `GET /health`                      | Estado del backend                         |
| `GET /api/dashboard/summary`       | KPIs principales del gimnasio              |
| `GET /api/occupancy/hourly`        | Predicción de aforo por hora               |
| `GET /api/occupancy/weekly-heatmap`| Heatmap semanal de demanda                 |
| `GET /api/occupancy/heatmap-real`  | Heatmap desde datos reales (parquet)       |
| `GET /api/recommendations/top-slots`| Top horarios recomendados                 |
| `GET /api/models/metrics`          | Métricas de los modelos ML                 |
| `GET /api/data/status`             | Estado del pipeline de datos               |
| `GET /api/data/sources`            | Lista de archivos y disponibilidad         |
| `GET /api/admin/metrics`           | Métricas operativas del sistema            |

---

## Archivos de datos que necesita

Copiar desde `gymtec_mvp_basico/ml_backend/`:

```bash
cp ml_backend/data/processed/*.parquet  gymtec_admin_web/admin_backend/data/processed/
cp ml_backend/data/raw/*.xlsx           gymtec_admin_web/admin_backend/data/raw/
cp ml_backend/models_artifacts/*.json   gymtec_admin_web/admin_backend/models_artifacts/
```

Sin estos archivos el backend funciona en **modo mock** (datos de demostración).  
Con ellos funciona en **modo live** (datos reales del pipeline ML).

---

## Qué NO se sube a GitHub

Definido en `.gitignore`:

- `node_modules/`, `.next/` — generados por npm
- `.venv/` — entorno virtual Python
- `.env`, `.env.local` — variables de entorno con secrets
- `*.pkl` — modelos binarios pesados
- `data/raw/*.xlsx` — datos crudos del gimnasio
- `*.zip` — archivos comprimidos

**Sí se sube:**
- Código frontend y backend
- `requirements.txt`, `package.json`
- `.env.example`
- `models_artifacts/*.json` (métricas, son livianas)
- `data/processed/*.csv` si son pequeños (opcional)

---

## Primeros pasos con Git

```bash
git add admin_frontend admin_backend docs README.md .gitignore
git commit -m "feat: gymtec admin web foundation"
git push origin main
```

---

## Documentación adicional

- [Arquitectura](docs/architecture.md)
- [Contratos de API](docs/api_contract.md)
- [Fuentes de datos](docs/data_sources.md)
- [Setup detallado](docs/setup.md)
- [Roadmap](docs/roadmap.md)