// src/components/layout/Tabs.jsx
// Equivalente a st.tabs([...]) en Streamlit.
// Administra qué tab está activo y renderiza su contenido.

import React, { useState } from 'react'

export default function Tabs({ tabs }) {
  // tabs: [{ label: 'Rating Histórico', content: <Componente /> }, ...]
  const [active, setActive] = useState(0)

  return (
    <div style={styles.wrapper}>
      {/* Barra de tabs */}
      <div style={styles.tabBar}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              ...styles.tabBtn,
              ...(active === i ? styles.tabBtnActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab activo */}
      <div style={styles.content}>
        {tabs[active]?.content}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tabBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    padding: '8px 16px 0',
    backgroundColor: '#0f1117',
    borderBottom: '1px solid #2d2d2d',
  },
  tabBtn: {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 500,
    border: 'none',
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    color: '#888888',
    cursor: 'pointer',
    borderRadius: '4px 4px 0 0',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  tabBtnActive: {
    color: '#ffffff',
    borderBottom: '2px solid #ff4b4b',
    backgroundColor: '#1e2130',
  },
  content: {
    flex: 1,
    padding: '16px',
    backgroundColor: '#0f1117',
    overflowY: 'auto',
  },
}
