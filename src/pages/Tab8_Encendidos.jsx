// src/pages/Tab8_Encendidos.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import TimePills from '../components/filters/TimePills'
import RegionTabs from '../components/layout/RegionTabs'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getEncendidos } from '../api/ratings'
import { TIME_OPTIONS_ENC, OV_PALETTE } from '../data/constants'

const REGIONS = [
  { label: 'MTY', key: 'mty', db: 'ZM Monterrey' },
  { label: 'CDMX', key: 'cdmx', db: 'ZMVM' },
  { label: 'GDL', key: 'gdl', db: 'ZM Guadalajara' },
  { label: 'INT', key: 'int', db: 'Interior' },
]

function EncendidosChart({ region, selectedDate, sample, target }) {
  const sampleNum = sample.split(' ')[0]
  const { data, loading, error } = useRatingsData(
    getEncendidos,
    { date: selectedDate, region: region.db, sample: sampleNum, target },
    [region.db, selectedDate, sample, target]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const ratingCols = Object.keys(data[0]).filter(k => k.startsWith('RATING_'))
    const xs = data.map(r => r.TIMESTAMP)

    return ratingCols.map((col, i) => {
      const ch = col.replace('RATING_', '')
      const shareCol = `SHARE_${ch}`
      return {
        x: xs,
        y: data.map(r => r[col] != null ? +r[col].toFixed(1) : null),
        customdata: data.map(r => r[shareCol] != null ? r[shareCol].toFixed(1) : 'N/A'),
        type: 'bar',
        name: ch,
        marker: { color: OV_PALETTE[i % OV_PALETTE.length] },
        hovertemplate: `Canal: ${ch}<br>Rating: %{y}<br>Share: %{customdata}%<extra></extra>`,
      }
    })
  }, [data])

  if (loading) return <Spinner message={`Cargando encendidos ${region.label}...`} />
  if (error) return <p style={{ color: '#ff4b4b' }}>Error: {error}</p>
  return (
    <Plot
      data={traces}
      layout={{
        height: 450, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        barmode: 'stack',
        font: { color: '#ccc', size: 12 },
        title: { text: `ENCENDIDOS — ${region.label}`, font: { size: 18 }, x: 0.5, xanchor: 'center' },
        xaxis: { title: 'HORA', gridcolor: '#2d2d2d', tickangle: -45 },
        yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
        legend: { orientation: 'h', y: -0.35, x: 0.5, xanchor: 'center', font: { size: 10 } },
      }}
      config={{ responsive: true }} style={{ width: '100%' }} useResizeHandler
    />
  )
}

export default function Tab8_Encendidos() {
  const { sampleTab8, setSampleTab8, selectedDate, target } = useFiltersStore()
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <TimePills options={TIME_OPTIONS_ENC} value={sampleTab8} onChange={setSampleTab8} label="Rango de minutos" />
      </div>
      <RegionTabs>
        {REGIONS.map(r => (
          <EncendidosChart key={r.db} region={r} selectedDate={selectedDate} sample={sampleTab8} target={target} />
        ))}
      </RegionTabs>
    </div>
  )
}
