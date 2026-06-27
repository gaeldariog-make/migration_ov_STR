// src/pages/Tab5_EvolucionSemanal.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import ChannelSelect from '../components/filters/ChannelSelect'
import TimePills from '../components/filters/TimePills'
import RegionTabs from '../components/layout/RegionTabs'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingHourWithProgram } from '../api/ratings'
import { TIME_OPTIONS } from '../data/constants'
import { numericToTimeLabel } from '../utils/dateUtils'
import { format } from 'date-fns'

const REGIONS = [
  { label: 'MTY', db: 'ZM Monterrey' },
  { label: 'CDMX', db: 'ZMVM' },
  { label: 'GDL', db: 'ZM Guadalajara' },
  { label: 'INT', db: 'Interior' },
]

const PALETTE = ['#80c5fa','#f1a2a3','#7bec9f','#ffd16a','#be00fe']

function HourChart({ region, channel, selectedDate, target, sample }) {
  const { data, loading, error } = useRatingsData(
    getRatingHourWithProgram,
    { date: selectedDate, region: region.db, channel, target, sample },
    [region.db, channel, selectedDate, target, sample]
  )

  const { traces, tickVals, tickTexts } = React.useMemo(() => {
    if (!data || data.length === 0) return { traces: [], tickVals: [], tickTexts: [] }

    const hourNums = data.map(r => r.HOUR_NUMERIC)
    const tickVals = hourNums
    const tickTexts = hourNums.map((h, i) => i % 5 === 0 ? numericToTimeLabel(h) : '')

    // Detectar columnas de rating y programa
    const ratingCols  = Object.keys(data[0]).filter(k => k.startsWith('RATING_'))
    const programCols = Object.keys(data[0]).filter(k => k.startsWith('PROGRAM_'))
    const selectedStr = format(selectedDate, 'yyyy-MM-dd')

    const traces = ratingCols.map((col, i) => {
      const dateStr = col.replace('RATING_', '')
      const progCol = `PROGRAM_${dateStr}`
      const isSelected = dateStr === selectedStr

      return {
        x: hourNums,
        y: data.map(r => r[col] != null ? +r[col].toFixed(1) : null),
        customdata: data.map(r => r[progCol] || 'Sin programa'),
        type: 'scatter',
        mode: isSelected ? 'lines+markers+text' : 'lines+markers',
        name: isSelected ? `${dateStr} (Seleccionada)` : dateStr,
        line: { color: isSelected ? 'red' : PALETTE[i % PALETTE.length], width: isSelected ? 3 : 1.5, dash: 'solid' },
        marker: { color: isSelected ? 'red' : PALETTE[i % PALETTE.length], size: isSelected ? 8 : 5 },
        opacity: isSelected ? 1 : 0.25 + i * 0.25,
        text: isSelected ? data.map((r, idx) => idx % 5 === 0 && r[col] != null ? r[col].toFixed(1) : '') : undefined,
        textposition: 'top center',
        hovertemplate: `Hora: %{x}<br>Programa: %{customdata}<br>Rating: %{y}<br>Fecha: <extra></extra>`,
      }
    })

    return { traces, tickVals, tickTexts }
  }, [data, selectedDate])

  if (loading) return <Spinner message={`Cargando ${region.label}...`} />
  if (error) return <p style={{ color: '#ff4b4b' }}>Error: {error}</p>
  return (
    <Plot
      data={traces}
      layout={{
        height: 500, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#ccc', size: 12 },
        title: { text: `RATING ${channel} ${region.label}`, font: { size: 24 }, x: 0.5, xanchor: 'center' },
        xaxis: { tickvals: tickVals, ticktext: tickTexts, gridcolor: '#2d2d2d', title: 'HORA' },
        yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
        legend: { orientation: 'h', y: -0.25, x: 0.5, xanchor: 'center', font: { size: 11 } },
      }}
      config={{ responsive: true }} style={{ width: '100%' }} useResizeHandler
    />
  )
}

export default function Tab5_EvolucionSemanal() {
  const { channelTab5, setChannelTab5, sampleTab5, setSampleTab5, selectedDate, target } = useFiltersStore()
  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' }}>
        <ChannelSelect value={channelTab5} onChange={setChannelTab5} label="Canal" />
        <TimePills options={TIME_OPTIONS} value={sampleTab5} onChange={setSampleTab5} label="Rango de minutos" />
      </div>
      <RegionTabs>
        {REGIONS.map(r => (
          <HourChart key={r.db} region={r} channel={channelTab5} selectedDate={selectedDate} target={target} sample={sampleTab5} />
        ))}
      </RegionTabs>
    </div>
  )
}
