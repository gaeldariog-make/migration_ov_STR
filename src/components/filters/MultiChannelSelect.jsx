// src/components/filters/MultiChannelSelect.jsx
// Equivalente a st.multiselect("Selecciona canales:", ...)

import React from 'react'
import Select from 'react-select'
import { ALL_CHANNELS } from '../../data/constants'

const options = ALL_CHANNELS.map(ch => ({ value: ch, label: ch }))

const darkStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#1e2130',
    borderColor: '#444',
    minHeight: 36,
    fontSize: 13,
  }),
  menu: (base) => ({ ...base, backgroundColor: '#1e2130', zIndex: 999 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#2d2d3d' : '#1e2130',
    color: '#fff',
    fontSize: 13,
  }),
  multiValue: (base) => ({ ...base, backgroundColor: '#2d2d3d' }),
  multiValueLabel: (base) => ({ ...base, color: '#fff' }),
  multiValueRemove: (base) => ({ ...base, color: '#aaa', ':hover': { backgroundColor: '#ff4b4b', color: '#fff' } }),
  input: (base) => ({ ...base, color: '#fff' }),
  placeholder: (base) => ({ ...base, color: '#666' }),
  singleValue: (base) => ({ ...base, color: '#fff' }),
}

export default function MultiChannelSelect({ value = [], onChange, channels = ALL_CHANNELS, label = 'Canales' }) {
  const opts = channels.map(ch => ({ value: ch, label: ch }))
  const selected = value.map(v => ({ value: v, label: v }))

  return (
    <div style={{ minWidth: 280 }}>
      <label style={{ fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 4 }}>
        {label}
      </label>
      <Select
        isMulti
        options={opts}
        value={selected}
        onChange={sel => onChange(sel.map(s => s.value))}
        styles={darkStyles}
        placeholder="Selecciona canales..."
      />
    </div>
  )
}
