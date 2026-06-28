# Overnight React

Migración del dashboard de TV Ratings de Streamlit a React.

## Requisitos previos

- Node.js 18+ - https://nodejs.org
- VSCode - https://code.visualstudio.com
- Git - https://git-scm.com

---

## Instalación y primer arranque

```bash
# 1. Entra a la carpeta del proyecto

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abrir en: **http://localhost:5173**

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

Actualmente la app usa **datos simulados** 

Cuando creemos FastAPI listo:
1. Abre `src/api/ratings.js`
2. Cambia `const USE_MOCK = true` → `false`
3. Escribir los endpoints reales en la sección de cada función

---

---

## Build para producción

```bash
npm run build
# Generar carpeta dist/ lista para deploy en Vercel, Cloudflare Pages, etc.
```
