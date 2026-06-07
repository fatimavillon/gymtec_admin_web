"""
Loads processed data files from admin_backend/data and models_artifacts.
Returns None when files are missing so services fall back to mock data.
"""
from __future__ import annotations
from pathlib import Path
from typing import Optional
import json

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

from app.core.config import settings


def _path(subdir: str, filename: str) -> Path:
    return settings.data_dir / subdir / filename


def _artifact(filename: str) -> Path:
    return settings.models_dir / filename


# ─── Parquet loaders ─────────────────────────────────────────────────────────

def load_predicciones_aforo() -> "Optional[pd.DataFrame]":
    if not HAS_PANDAS:
        return None
    p = _path("processed", "predicciones_aforo.parquet")
    if not p.exists():
        p = _path("processed", "predicciones_aforo.csv")
    if p.exists():
        try:
            return pd.read_parquet(p) if p.suffix == ".parquet" else pd.read_csv(p)
        except Exception:
            return None
    return None


def load_recomendaciones() -> "Optional[pd.DataFrame]":
    if not HAS_PANDAS:
        return None
    p = _path("processed", "recomendaciones_horario.parquet")
    if not p.exists():
        p = _path("processed", "recomendaciones_horario.csv")
    if p.exists():
        try:
            return pd.read_parquet(p) if p.suffix == ".parquet" else pd.read_csv(p)
        except Exception:
            return None
    return None


def load_aforo_por_slot() -> "Optional[pd.DataFrame]":
    if not HAS_PANDAS:
        return None
    p = _path("processed", "aforo_por_slot.parquet")
    if p.exists():
        try:
            return pd.read_parquet(p)
        except Exception:
            return None
    return None


# ─── Metrics JSON loaders ────────────────────────────────────────────────────

def load_model_metrics(model_name: str) -> Optional[dict]:
    p = _artifact(f"{model_name}_metrics.json")
    if p.exists():
        try:
            return json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            return None
    return None


# ─── File counters ───────────────────────────────────────────────────────────

def count_files(subdir: str) -> int:
    d = settings.data_dir / subdir
    if not d.exists():
        return 0
    return len([f for f in d.iterdir() if f.is_file()])


def count_artifacts() -> int:
    d = settings.models_dir
    if not d.exists():
        return 0
    return len([f for f in d.iterdir() if f.is_file()])


def data_is_loaded() -> bool:
    return (
            _path("processed", "predicciones_aforo.parquet").exists()
            or _path("processed", "predicciones_aforo.csv").exists()
    )