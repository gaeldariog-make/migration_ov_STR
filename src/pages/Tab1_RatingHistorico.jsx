// src/pages/Tab1_RatingHistorico.jsx
// Equivalente al tab1 de Streamlit: gráfica de rating mensual por canal

import React from 'react'
import Plot from 'react-plotly.js'
import ChannelSelect from '../components/filters/ChannelSelect'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingMonthly } from '../api/ratings'
import { MESES } from '../utils/dateUtils'
import { CHART_PALETTE } from '../data/constants'
//import { MESES, CHART_PALETTE } from '../utils/dateUtils'
//import { MESES as M } from '../utils/dateUtils'

export default function Tab1_RatingHistorico() {
  const { channelTab1, setChannelTab1, selectedDate, target } = useFiltersStore()
  const { data, loading, error } = useRatingsData(
    getRatingMonthly,
    { channel: channelTab1, target, date: selectedDate },
    [channelTab1, selectedDate, target]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const yearKeys = Object.keys(data[0]).filter(k => k !== 'MONTH')
    return yearKeys.map((year, i) => ({
      x: data.map(r => MESES[r.MONTH - 1]),
      y: data.map(r => r[year] != null ? +r[year].toFixed(1) : null),
      type: 'scatter',
      mode: 'lines+markers+text',
      name: String(year),
      line:   { color: CHART_PALETTE[i % CHART_PALETTE.length], width: 2 },
      marker: { color: CHART_PALETTE[i % CHART_PALETTE.length], size: 6 },
      text: data.map(r => r[year] != null ? r[year].toFixed(1) : ''),
      textposition: 'top center',
      textfont: { size: 10 },
      hovertemplate: `Mes: %{x}<br>Rating: %{y}<br>Año: ${year}<extra></extra>`,
    }))
  }, [data])

  return (
    <div>
      <div style={styles.controls}>
        <ChannelSelect value={channelTab1} onChange={setChannelTab1} label="Canal" />
      </div>

      {loading && <Spinner message="Cargando rating histórico..." />}
      {error   && <p style={{ color: '#ff4b4b' }}>Error: {error}</p>}
      {!loading && !error && data && (
        <Plot
          data={traces}
          layout={{
            height: 500,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: '#ccc', size: 12 },
            title: { text: `RATING ${channelTab1} — HISTÓRICO MENSUAL`, font: { size: 20 }, x: 0.5, xanchor: 'center' },
            xaxis: { title: 'MES', gridcolor: '#2d2d2d', tickfont: { size: 11 } },
            yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d', tickfont: { size: 11 } },
            legend: { orientation: 'h', y: -0.2, x: 0.5, xanchor: 'center', font: { size: 12 } },
          }}
          config={{ displayModeBar: true, responsive: true }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      )}
    </div>
  )
}

const styles = {
  controls: { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' },
}
