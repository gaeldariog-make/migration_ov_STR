// src/components/filters/HourRangeSlider.jsx
// Equivalente a st.select_slider("Hora inicio / fin", ...)

import React from 'react'

const HOURS = Array.from({ length: 22 }, (_, i) => String(i + 5).padStart(2, '0')) // "05" ... "26"

export default function HourRangeSlider({ startHour, endHour, onChangeStart, onChangeEnd, label = 'Rango de horas' }) {
  return (
    <div style={styles.wrapper}>
      {label && <label style={styles.label}>{label}</label>}
      <div style={styles.row}>
        <div style={styles.group}>
          <span style={styles.sublabel}>Desde</span>
          <select value={startHour} onChange={e => onChangeStart(e.target.value)} style={styles.select}>
            {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
          </select>
        </div>
        <span style={styles.dash}>→</span>
        <div style={styles.group}>
          <span style={styles.sublabel}>Hasta</span>
          <select value={endHour} onChange={e => onChangeEnd(e.target.value)} style={styles.select}>
            {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper:  { display: 'flex', flexDirection: 'column', gap: 4 },
  label:    { fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  row:      { display: 'flex', alignItems: 'flex-end', gap: 8 },
  group:    { display: 'flex', flexDirection: 'column', gap: 2 },
  sublabel: { fontSize: 10, color: '#666' },
  dash:     { color: '#666', marginBottom: 6 },
  select: {
    backgroundColor: '#1e2130',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: 4,
    padding: '5px 8px',
    fontSize: 12,
    cursor: 'pointer',
  },
}
