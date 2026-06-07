# Setup — GYMTEC Admin Web

## Prerrequisitos

- Python ≥ 3.11
- Node.js ≥ 18
- Git

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/gymtec_admin_web.git
cd gymtec_admin_web
```

---

## 2. Backend FastAPI

```bash
cd admin_backend

# Crear entorno virtual
python -m venv .venv

# Activar (Windows)
.venv\Scripts\activate

# Activar (Mac/Linux)
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Levantar servidor
uvicorn app.api.main:app --reload --port 8001
```

Verificar en:
- API:     http://localhost:8001/health
- Swagger: http://localhost:8001/docs

---

## 3. Frontend Next.js

```bash
cd admin_frontend

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

Abrir: http://localhost:3000 → redirige automáticamente a `/dashboard`

---

## 4. Conectar con datos reales del MVP

Para usar datos reales del pipeline de `gymtec_mvp_basico`:

```bash
# Desde la raíz de gymtec_admin_web
cp ../gymtec_mvp_basico/ml_backend/data/processed/*.parquet admin_backend/data/processed/
cp ../gymtec_mvp_basico/ml_backend/data/processed/*.csv     admin_backend/data/processed/
cp ../gymtec_mvp_basico/ml_backend/data/raw/*.xlsx           admin_backend/data/raw/
cp ../gymtec_mvp_basico/ml_backend/data/interim/*.parquet    admin_backend/data/interim/
cp ../gymtec_mvp_basico/ml_backend/models_artifacts/*.json   admin_backend/models_artifacts/

# Opcional: copiar modelos .pkl (son pesados)
cp ../gymtec_mvp_basico/ml_backend/models_artifacts/*.pkl    admin_backend/models_artifacts/
```

Luego reiniciar el backend. El endpoint `/health` mostrará `"data_loaded": true`.

---

## 5. Variables de entorno

`admin_frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

`admin_backend/.env` (opcional):
```
PORT=8001
DATA_DIR=./data
MODELS_DIR=./models_artifacts
ALLOW_ORIGINS=http://localhost:3000
```

---

## 6. Git — primer push

```bash
git add admin_frontend admin_backend docs README.md .gitignore
git commit -m "feat: gymtec admin web foundation"
git push origin main
```

> Los archivos `.pkl`, `.xlsx` y `.env.local` están en `.gitignore` y **no se suben**.