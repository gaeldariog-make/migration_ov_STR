// src/App.jsx
// Punto de entrada principal de la app. Equivalente al cuerpo completo
// del archivo .py de Streamlit.

import React from 'react'
import Header from './components/layout/Header'
import Tabs from './components/layout/Tabs'
import Tab1_RatingHistorico from './pages/Tab1_RatingHistorico'
import Tab2_RatingNacional from './pages/Tab2_RatingNacional'
import Tab3_RatingHistoricoRegional from './pages/Tab3_RatingHistoricoRegional'
import Tab4_RatingRegiones from './pages/Tab4_RatingRegiones'
import Tab5_EvolucionSemanal from './pages/Tab5_EvolucionSemanal'
import Tab6_Overnight from './pages/Tab6_Overnight'
import Tab7_EncendidosEvolucion from './pages/Tab7_EncendidosEvolucion'
import Tab8_Encendidos from './pages/Tab8_Encendidos'

// Los mismos 8 tabs que en Streamlit
const TABS = [
  { label: 'Rating Histórico',          content: <Tab1_RatingHistorico /> },
  { label: 'Rating Nacional',           content: <Tab2_RatingNacional /> },
  { label: 'Rating Histórico Regional', content: <Tab3_RatingHistoricoRegional /> },
  { label: 'Rating Regiones',           content: <Tab4_RatingRegiones /> },
  { label: 'Evolución Semanal',         content: <Tab5_EvolucionSemanal /> },
  { label: 'Overnight',                 content: <Tab6_Overnight /> },
  { label: 'Encendidos Evolución',      content: <Tab7_EncendidosEvolucion /> },
  { label: 'Encendidos',               content: <Tab8_Encendidos /> },
]

export default function App() {
  return (
    <div style={styles.app}>
      <Header />
      <main style={styles.main}>
        <Tabs tabs={TABS} />
      </main>
    </div>
  )
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#0f1117',
    color: '#ffffff',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    fontSize: 13,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}
