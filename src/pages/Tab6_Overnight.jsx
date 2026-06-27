// src/pages/Tab6_Overnight.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import TimePills from '../components/filters/TimePills'
import RegionTabs from '../components/layout/RegionTabs'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingOvernight } from '../api/ratings'
import { TIME_OPTIONS, OV_PALETTE } from '../data/constants'

const REGIONS = [
  { label: 'MTY', db: 'ZM Monterrey', channels: ['AZTECA 7','AZTECA UNO','CANAL 4','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE'] },
  { label: 'CDMX', db: 'ZMVM', channels: ['ADN40','AZTECA 7','AZTECA UNO','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','MILENIO','N+ FORO','NU9VE'] },
  { label: 'GDL', db: 'ZM Guadalajara', channels: ['AZTECA 7','AZTECA UNO','CANAL 4','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE'] },
]

function OvernightChart({ region, selectedDate, target, sample }) {
  const { data, loading, error } = useRatingsData(
    getRatingOvernight,
    { date: selectedDate, region: region.db, channels: region.channels, target, sample },
    [region.db, selectedDate, target, sample]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const channelKeys = Object.keys(data[0]).filter(k => k !== 'TIMESTAMP')
    return channelKeys.map((ch, i) => ({
      x: data.map(r => r.TIMESTAMP),
      y: data.map(r => r[ch] != null ? +r[ch].toFixed(1) : null),
      type: 'scatter', mode: 'lines+markers', name: ch,
      line: {
        color: OV_PALETTE[i % OV_PALETTE.length],
        width: ch === 'CANAL 6' ? 4 : 2,
        dash: ch === 'CANAL 6' ? 'dashdot' : 'solid'
      },
      marker: { color: OV_PALETTE[i % OV_PALETTE.length], size: ch === 'CANAL 6' ? 8 : 5 },
      hovertemplate: `Hora: %{x}<br>Fecha : <br>Canal: ${ch}<br>Rating: %{y}<extra></extra>`,
    }))
  }, [data])

  if (loading) return <Spinner message={`Cargando overnight ${region.label}...`} />
  if (error) return <p style={{ color: '#ff4b4b' }}>Error: {error}</p>
  return (
    <Plot
      data={traces}
      layout={{
        height: 500, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#ccc', size: 12 },
        title: { text: `OVERNIGHT MULTIMEDIOS ${region.label}`, font: { size: 22 }, x: 0.5, xanchor: 'center' },
        xaxis: { title: 'HORA', gridcolor: '#2d2d2d', tickangle: -45 },
        yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
        legend: { orientation: 'h', y: -0.3, x: 0.5, xanchor: 'center', font: { size: 11 } },
      }}
      config={{ responsive: true }} style={{ width: '100%' }} useResizeHandler
    />
  )
}

export default function Tab6_Overnight() {
  const { sampleTab6, setSampleTab6, selectedDate, target } = useFiltersStore()
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <TimePills options={TIME_OPTIONS} value={sampleTab6} onChange={setSampleTab6} label="Rango de minutos" />
      </div>
      <RegionTabs regions={[{ label: 'MTY', key: 'mty' }, { label: 'CDMX', key: 'cdmx' }, { label: 'GDL', key: 'gdl' }]}>
        {REGIONS.map(r => (
          <OvernightChart key={r.db} region={r} selectedDate={selectedDate} target={target} sample={sampleTab6} />
        ))}
      </RegionTabs>
    </div>
  )
}
