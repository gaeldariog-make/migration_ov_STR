// src/pages/Tab4_RatingRegiones.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import ChannelSelect from '../components/filters/ChannelSelect'
import HourRangeSlider from '../components/filters/HourRangeSlider'
import RegionTabs from '../components/layout/RegionTabs'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingNDays } from '../api/ratings'
import { CHART_PALETTE } from '../data/constants'

const REGIONS = [
  { label: 'MTY', db: 'ZM Monterrey' },
  { label: 'CDMX', db: 'ZMVM' },
  { label: 'GDL', db: 'ZM Guadalajara' },
  { label: 'INT', db: 'Interior' },
]

function RegionChart({ region, channel, selectedDate, target, startHour, endHour }) {
  const { data, loading, error } = useRatingsData(
    getRatingNDays,
    { date: selectedDate, region: region.db, channel, target, startHour, endHour },
    [region.db, channel, selectedDate, target, startHour, endHour]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const regionKeys = Object.keys(data[0]).filter(k => k !== 'DATE_COLUMN')
    return regionKeys.map((r, i) => ({
      x: data.map(d => d.DATE_COLUMN),
      y: data.map(d => d[r] != null ? +d[r].toFixed(1) : null),
      type: 'scatter', mode: 'lines+markers', name: r,
      line: { color: CHART_PALETTE[i % CHART_PALETTE.length], width: 2 },
      marker: { color: CHART_PALETTE[i % CHART_PALETTE.length], size: 5 },
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
        title: { text: `RATING ${channel} — ${region.label} — Últimos 30 días`, font: { size: 16 }, x: 0.5, xanchor: 'center' },
        xaxis: { gridcolor: '#2d2d2d', tickangle: -45 },
        yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
        legend: { orientation: 'h', y: -0.3, x: 0.5, xanchor: 'center' },
      }}
      config={{ responsive: true }} style={{ width: '100%' }} useResizeHandler
    />
  )
}

export default function Tab4_RatingRegiones() {
  const { channelTab4, setChannelTab4, startHourTab4, setStartHourTab4, endHourTab4, setEndHourTab4, selectedDate, target } = useFiltersStore()
  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' }}>
        <ChannelSelect value={channelTab4} onChange={setChannelTab4} label="Canal" />
        <HourRangeSlider startHour={startHourTab4} onChangeStart={setStartHourTab4} endHour={endHourTab4} onChangeEnd={setEndHourTab4} />
      </div>
      <RegionTabs>
        {REGIONS.map(r => (
          <RegionChart key={r.db} region={r} channel={channelTab4} selectedDate={selectedDate} target={target} startHour={startHourTab4} endHour={endHourTab4} />
        ))}
      </RegionTabs>
    </div>
  )
}
