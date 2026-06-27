// src/hooks/useRatingsData.js
// Hook genérico para cualquier llamada a la API de ratings.
// Equivalente a @st.cache_data: guarda el resultado en caché mientras
// los parámetros no cambien.

import { useState, useEffect, useRef } from 'react'

export function useRatingsData(fetchFn, params, deps = []) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const cache = useRef({})

  useEffect(() => {
    let cancelled = false
    const key = JSON.stringify(params)

    if (cache.current[key]) {
      setData(cache.current[key])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetchFn(params)
      .then(result => {
        if (!cancelled) {
          cache.current[key] = result
          setData(result)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, deps)

  return { data, loading, error }
}
