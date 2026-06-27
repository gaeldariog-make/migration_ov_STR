// src/components/filters/TimePills.jsx
// Equivalente a st.pills("Rango de minutos", options, ...)

import React from 'react'

export default function TimePills({ options, value, onChange, label = 'Rango de minutos' }) {
  return (
    <div style={styles.wrapper}>
      {label && <label style={styles.label}>{label}</label>}
      <div style={styles.pills}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{ ...styles.pill, ...(value === opt ? styles.pillActive : {}) }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 4 },
  label:   { fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  pills:   { display: 'flex', gap: 6, flexWrap: 'wrap' },
  pill: {
    padding: '5px 12px',
    fontSize: 12,
    border: '1px solid #444',
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#888',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  pillActive: {
    backgroundColor: '#ff4b4b',
    borderColor: '#ff4b4b',
    color: '#fff',
    fontWeight: 600,
  },
}
