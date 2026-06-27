// src/components/layout/RegionTabs.jsx
// Sub-tabs de región: MTY | CDMX | GDL | INT
// Usado en Tab 5, 6, 7, 8

import React, { useState } from 'react'

const REGIONS = [
  { label: 'MTY', key: 'mty' },
  { label: 'CDMX', key: 'cdmx' },
  { label: 'GDL', key: 'gdl' },
  { label: 'INT', key: 'int' },
]

export default function RegionTabs({ children, regions = REGIONS }) {
  const [active, setActive] = useState(0)
  // children puede ser un array de 3 o 4 elementos (uno por región)
  const childArray = React.Children.toArray(children)

  return (
    <div>
      <div style={styles.tabBar}>
        {regions.map((r, i) => (
          <button
            key={r.key}
            onClick={() => setActive(i)}
            style={{ ...styles.btn, ...(active === i ? styles.btnActive : {}) }}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div style={styles.content}>
        {childArray[active]}
      </div>
    </div>
  )
}

const styles = {
  tabBar: {
    display: 'flex',
    gap: 4,
    marginBottom: 12,
  },
  btn: {
    padding: '6px 14px',
    fontSize: 12,
    border: '1px solid #444',
    backgroundColor: 'transparent',
    color: '#888',
    cursor: 'pointer',
    borderRadius: 4,
  },
  btnActive: {
    backgroundColor: '#1e2130',
    color: '#fff',
    borderColor: '#666',
  },
  content: {
    minHeight: 400,
  },
}
