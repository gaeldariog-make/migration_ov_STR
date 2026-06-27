// src/pages/Tab3_RatingHistoricoRegional.jsx
// Equivalente al tab3: rating mensual por región y canal específico

import React from 'react'
import Plot from 'react-plotly.js'
import Spinner from '../components/ui/Spinner'
import ChannelSelect from '../components/filters/ChannelSelect'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingMonthlyRegion } from '../api/ratings'
import { CHANNELS_BY_REGION, CHART_PALETTE } from '../data/constants'
import { MESES } from '../utils/dateUtils'

const REGIONS = [
  { label: 'Monterrey', value: 'ZM Monterrey' },
  { label: 'CDMX',      value: 'ZMVM' },
  { label: 'Guadalajara', value: 'ZM Guadalajara' },
  { label: 'Interior',  value: 'Interior' },
]

export default function Tab3_RatingHistoricoRegional() {
  const { regionTab3, setRegionTab3, channelTab3, setChannelTab3, selectedDate, target } = useFiltersStore()

  const availableChannels = CHANNELS_BY_REGION[regionTab3] || []

  const { data, loading, error } = useRatingsData(
    getRatingMonthlyRegion,
    { region: regionTab3, channel: channelTab3, target, date: selectedDate },
    [regionTab3, channelTab3, selectedDate, target]
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
    }))
  }, [data])

  const regionLabel = REGIONS.find(r => r.value === regionTab3)?.label || regionTab3

  return (
    <div>
      <div style={styles.controls}>
        {/* Selector de región */}
        <div style={styles.group}>
          <label style={styles.label}>Región</label>
          <select
            value={regionTab3}
            onChange={e => {
              setRegionTab3(e.target.value)
              const chs = CHANNELS_BY_REGION[e.target.value] || []
              if (!chs.includes(channelTab3)) setChannelTab3(chs[0] || 'CANAL 6')
            }}
            style={styles.select}
          >
            {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>

        <ChannelSelect value={channelTab3} onChange={setChannelTab3} channels={availableChannels} label="Canal" />
      </div>

      {loading && <Spinner message="Cargando histórico regional..." />}
      {error   && <p style={{ color: '#ff4b4b' }}>Error: {error}</p>}
      {!loading && !error && data && (
        <Plot
          data={traces}
          layout={{
            height: 500,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: '#ccc', size: 12 },
            title: { text: `RATING ${channelTab3} — ${regionLabel.toUpperCase()} — HISTÓRICO`, font: { size: 18 }, x: 0.5, xanchor: 'center' },
            xaxis: { title: 'MES', gridcolor: '#2d2d2d' },
            yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
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
  group:    { display: 'flex', flexDirection: 'column', gap: 4 },
  label:    { fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  select:   { backgroundColor: '#1e2130', color: '#fff', border: '1px solid #444', borderRadius: 4, padding: '6px 10px', fontSize: 13 },
}
