// src/components/layout/Header.jsx
// Equivalente al header + date_input + selectbox proveedor de Streamlit

import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { subDays } from 'date-fns'
import { useFiltersStore } from '../../store/filtersStore'

export default function Header() {
  const { selectedDate, setSelectedDate, dataProvider, setDataProvider } = useFiltersStore()
  const maxDate = subDays(new Date(), 1)

  return (
    <header style={styles.header}>
      {/* Logo + Título */}
      <div style={styles.brand}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Grupo_Multimedios_%28M%29.png"
          alt="Multimedios"
          style={styles.logo}
        />
        <h1 style={styles.title}>RATING TV CANAL 6</h1>
      </div>

      {/* Controles globales */}
      <div style={styles.controls}>
        {/* Selector de fecha */}
        <div style={styles.controlGroup}>
          <label style={styles.label}>Fecha</label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            maxDate={maxDate}
            dateFormat="yyyy-MM-dd"
            className="datepicker-input"
          />
        </div>

        {/* Selector de proveedor */}
        <div style={styles.controlGroup}>
          <label style={styles.label}>Proveedor</label>
          <select
            value={dataProvider}
            onChange={e => setDataProvider(e.target.value)}
            style={styles.select}
          >
            <option value="HR Media">HR Media</option>
            <option value="Nielsen IBOPE">Nielsen IBOPE</option>
          </select>
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    backgroundColor: '#0f1117',
    borderBottom: '1px solid #2d2d2d',
    flexWrap: 'wrap',
    gap: 12,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 50,
    height: 'auto',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  controls: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  select: {
    backgroundColor: '#1e2130',
    color: '#ffffff',
    border: '1px solid #444',
    borderRadius: 4,
    padding: '6px 10px',
    fontSize: 13,
    cursor: 'pointer',
  },
}
