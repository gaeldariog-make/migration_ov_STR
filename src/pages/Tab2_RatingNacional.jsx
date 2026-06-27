// src/pages/Tab2_RatingNacional.jsx
// Equivalente al tab2: rating de últimos 30 días, múltiples canales, nacional

import React from 'react'
import Plot from 'react-plotly.js'
import MultiChannelSelect from '../components/filters/MultiChannelSelect'
import HourRangeSlider from '../components/filters/HourRangeSlider'
import Spinner from '../components/ui/Spinner'
import { useFiltersStore } from '../store/filtersStore'
import { useRatingsData } from '../hooks/useRatingsData'
import { getRatingNDaysNacional } from '../api/ratings'
import { CHART_PALETTE } from '../data/constants'

export default function Tab2_RatingNacional() {
  const {
    channelsTab2, setChannelsTab2,
    startHourTab2, setStartHourTab2,
    endHourTab2,   setEndHourTab2,
    selectedDate,  target,
  } = useFiltersStore()

  const { data, loading, error } = useRatingsData(
    getRatingNDaysNacional,
    { date: selectedDate, channels: channelsTab2, target, startHour: startHourTab2, endHour: endHourTab2 },
    [channelsTab2, selectedDate, startHourTab2, endHourTab2, target]
  )

  const traces = React.useMemo(() => {
    if (!data || data.length === 0) return []
    const channels = Object.keys(data[0]).filter(k => k !== 'DATE_COLUMN')
    return channels.map((ch, i) => ({
      x: data.map(r => r.DATE_COLUMN),
      y: data.map(r => r[ch] != null ? +r[ch].toFixed(1) : null),
      type: 'scatter',
      mode: 'lines+markers',
      name: ch,
      line:   { color: CHART_PALETTE[i % CHART_PALETTE.length], width: ch === 'CANAL 6' ? 3 : 1.5 },
      marker: { color: CHART_PALETTE[i % CHART_PALETTE.length], size: ch === 'CANAL 6' ? 7 : 5 },
      hovertemplate: `Fecha: %{x}<br>Canal: ${ch}<br>Rating: %{y}<extra></extra>`,
    }))
  }, [data])

  return (
    <div>
      <div style={styles.controls}>
        <MultiChannelSelect value={channelsTab2} onChange={setChannelsTab2} label="Canales" />
        <HourRangeSlider
          startHour={startHourTab2} onChangeStart={setStartHourTab2}
          endHour={endHourTab2}     onChangeEnd={setEndHourTab2}
          label="Rango de horas"
        />
      </div>

      {loading && <Spinner message="Cargando rating nacional..." />}
      {error   && <p style={{ color: '#ff4b4b' }}>Error: {error}</p>}
      {!loading && !error && data && (
        <Plot
          data={traces}
          layout={{
            height: 500,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: '#ccc', size: 12 },
            title: { text: `RATING NACIONAL — Últimos 30 días (${startHourTab2}:00–${endHourTab2}:00)`, font: { size: 18 }, x: 0.5, xanchor: 'center' },
            xaxis: { title: 'FECHA', gridcolor: '#2d2d2d', tickangle: -45 },
            yaxis: { title: 'RATING MILES', gridcolor: '#2d2d2d' },
            legend: { orientation: 'h', y: -0.3, x: 0.5, xanchor: 'center', font: { size: 11 } },
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
  controls: { display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16, alignItems: 'flex-end' },
}
