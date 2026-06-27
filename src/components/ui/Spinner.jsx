// src/components/ui/Spinner.jsx

import React from 'react'

export default function Spinner({ message = 'Cargando...' }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <span style={styles.text}>{message}</span>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    gap: 12,
  },
  spinner: {
    width: 36,
    height: 36,
    border: '3px solid #2d2d2d',
    borderTop: '3px solid #ff4b4b',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    color: '#888',
    fontSize: 13,
  },
}

// Inyectar keyframe de animación globalmente una sola vez
if (typeof document !== 'undefined' && !document.getElementById('spinner-style')) {
  const style = document.createElement('style')
  style.id = 'spinner-style'
  style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`
  document.head.appendChild(style)
}
