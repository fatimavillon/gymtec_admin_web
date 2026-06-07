# Roadmap — GYMTEC Admin Web

## v0.1.0 — Fundación (actual)
- [x] Estructura de repositorio separada de gymtec_mvp_basico
- [x] Backend FastAPI con endpoints mock + fallback a datos reales
- [x] Frontend Next.js con App Router, TypeScript, TailwindCSS
- [x] Dashboard con KPIs, gráfico horario, heatmap, recomendaciones
- [x] Páginas: Ocupación, Recomendaciones, Modelos, Estado de Datos, Settings
- [x] Indicador live/mock por página
- [x] data_loader.py listo para leer parquet/csv/json reales

## v0.2.0 — Integración con datos reales
- [ ] Copiar y servir predicciones_aforo.parquet desde pipeline
- [ ] Copiar y servir recomendaciones_horario.parquet desde pipeline
- [ ] Activar heatmap-real con aforo_por_slot.parquet
- [ ] Leer métricas desde rf0*_metrics.json automáticamente
- [ ] Badge "Datos reales" en todas las páginas cuando hay conexión

## v0.3.0 — Features operativos
- [ ] Autenticación JWT para administradores
- [ ] Página de logs de pipeline (última ejecución, errores)
- [ ] Trigger manual de re-predicción desde el admin
- [ ] Exportar recomendaciones a CSV desde la UI
- [ ] Alertas cuando el aforo supera umbral crítico

## v0.4.0 — Producción UTEC
- [ ] Despliegue en servidor UTEC o Railway + Vercel
- [ ] Variables de entorno de producción
- [ ] HTTPS y dominio gymtec.utec.edu.pe/admin
- [ ] Integración con sistema académico UTEC para horarios en tiempo real