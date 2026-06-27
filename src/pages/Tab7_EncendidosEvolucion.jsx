// src/pages/Tab7_EncendidosEvolucion.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import ChannelSelect from '../components/filters/ChannelSelect'
import TimePills from '../components/filters/TimePills'
import RegionTabs from '../components/layout/RegionTabs'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingSenalesRegion } from '../api/ratings'
import { TIME_OPTIONS_ENC, CHART_PALETTE } from '../data/constants'
import { numericToTimeLabel } from '../utils/dateUtils'

const SENALES = ['TOTAL', 'TOTAL OVERNIGHT', 'TV Abierta', 'TV Otros', 'TV Paga']

const REGIONS = [
  { label: 'MTY', db: 'ZM Monterrey' },
  { label: 'CDMX', db: 'ZMVM' },
  { label: 'GDL', db: 'ZM Guadalajara' },
  { label: 'INT', db: 'Interior' },
]

function SenalChart({ region, channel, selectedDate, target, sample }) {
  const { data, loading, error } = useRatingsData(
    getRatingSenalesRegion,
    { date: selectedDate, region: region.db, channel: channel === 'TOTAL OVERNIGHT' ? 'TOTAL_OV' : channel, target, sample },
    [region.db, channel, selectedDate, target, sample]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const hourNums = data.map(r => r.HOUR_NUMERIC)
    const dateCols = Object.keys(data[0]).filter(k => k.startsWith('TOTAL_'))
    return dateCols.map((col, i) => ({
      x: hourNums,
      y: data.map(r => r[col] != null ? +r[col].toFixed(1) : null),
      type: 'scatter', mode: 'lines', name: col.replace('TOTAL_', '').replace('OV_', 'OV '),
      line: { color: CHART_PALETTE[i % CHART_PALETTE.length], width: 1.5 },
      hovertemplate: `Hora: %{x}<br>Rating: %{y}<extra></extra>`,
    }))
  }, [data])

  if (loading) return <Spinner message={`Cargando ${region.label}...`} />
  if (error) return <p style={{ color: '#ff4b4b' }}>Error: {error}</p>
  return (
    <Plot
      data={traces}
      layout={{
        height: 450, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#ccc', size: 12 },
        title: { text: `ENCENDIDOS ${channel} — ${region.label}`, font: { size: 18 }, x: 0.5, xanchor: 'center' },
        xaxis: { title: 'HORA', gridcolor: '#2d2d2d' },
        yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
        legend: { orientation: 'h', y: -0.3, x: 0.5, xanchor: 'center', font: { size: 11 } },
      }}
      config={{ responsive: true }} style={{ width: '100%' }} useResizeHandler
    />
  )
}

export default function Tab7_EncendidosEvolucion() {
  const { channelTab7, setChannelTab7, sampleTab7, setSampleTab7, selectedDate, target } = useFiltersStore()
  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' }}>
        <ChannelSelect value={channelTab7} onChange={setChannelTab7} channels={SENALES} label="Señal" />
        <TimePills options={TIME_OPTIONS_ENC} value={sampleTab7} onChange={setSampleTab7} label="Rango de minutos" />
      </div>
      <RegionTabs>
        {REGIONS.map(r => (
          <SenalChart key={r.db} region={r} channel={channelTab7} selectedDate={selectedDate} target={target} sample={sampleTab7} />
        ))}
      </RegionTabs>
    </div>
  )
}
