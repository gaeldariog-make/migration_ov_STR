// src/components/filters/ChannelSelect.jsx
// Equivalente a st.selectbox("Selecciona el canal:", ...)

import React from 'react'
import { ALL_CHANNELS } from '../../data/constants'

export default function ChannelSelect({ value, onChange, channels = ALL_CHANNELS, label = 'Canal' }) {
  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={styles.select}
      >
        {channels.map(ch => (
          <option key={ch} value={ch}>{ch}</option>
        ))}
      </select>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 160 },
  label:   { fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  select:  {
    backgroundColor: '#1e2130',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: 4,
    padding: '6px 10px',
    fontSize: 13,
    cursor: 'pointer',
  },
}
