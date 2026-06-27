# Multimedios Dashboard — React

Migración del dashboard de TV Ratings de Streamlit a React.

## Requisitos previos

- Node.js 18+ → https://nodejs.org (descarga la versión LTS)
- VSCode → https://code.visualstudio.com
- Git → https://git-scm.com

---

## Instalación y primer arranque

```bash
# 1. Entra a la carpeta del proyecto
cd multimedios-dashboard

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

---

## Estructura de carpetas

```
src/
├── api/           # Llamadas a FastAPI (o mock de datos)
├── components/    # Componentes reutilizables
│   ├── charts/    # Gráficas
│   ├── filters/   # Filtros: canal, fecha, pills, slider
│   ├── layout/    # Header, Tabs, RegionTabs
│   └── ui/        # Spinner, etc.
├── data/          # Constantes globales y datos mock
├── hooks/         # useRatingsData (caché de datos)
├── pages/         # Un archivo por tab (Tab1 a Tab8)
├── store/         # Estado global con Zustand (= st.session_state)
└── utils/         # Helpers de fechas
```

---

## Tabs equivalentes a Streamlit

| Tab React          | Tab Streamlit                  |
|--------------------|-------------------------------|
| Rating Histórico   | tab1 — rating mensual         |
| Rating Nacional    | tab2 — últimos 30 días nac.   |
| Rating Hist. Reg.  | tab3 — mensual por región     |
| Rating Regiones    | tab4 — 30 días por región     |
| Evolución Semanal  | tab5 — por hora con programa  |
| Overnight          | tab6 — overnight              |
| Encendidos Evoluc. | tab7 — señales región         |
| Encendidos         | tab8 — share + rating         |

---

## Datos Mock vs FastAPI

Actualmente la app usa **datos simulados** (no necesitas Snowflake).

Cuando tengas FastAPI listo:
1. Abre `src/api/ratings.js`
2. Cambia `const USE_MOCK = true` → `false`
3. Escribe los endpoints reales en la sección de cada función

---

## Flujo de trabajo con Git

```bash
# Crear una branch para nuevas features
git checkout -b feature/mi-nueva-funcion

# Guardar cambios
git add .
git commit -m "Descripción de lo que hice"

# Subir a GitHub
git push origin feature/mi-nueva-funcion

# Cuando esté listo, merge a main
git checkout main
git merge feature/mi-nueva-funcion
git push
```

---

## Build para producción

```bash
npm run build
# Genera carpeta dist/ lista para deploy en Vercel, Cloudflare Pages, etc.
```
