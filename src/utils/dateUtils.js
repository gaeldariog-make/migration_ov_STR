// src/utils/dateUtils.js

import { format, subDays } from 'date-fns'

// Convierte número decimal de hora a label "HH:MM"
// Equivalente a numeric_to_time_label() en Python
export function numericToTimeLabel(n) {
  const hour   = Math.floor(n)
  const minute = Math.round((n % 1) * 60)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

// Genera las últimas 5 semanas a partir de una fecha
// Equivalente a get_5_weeks() en Python
export function getLast5Weeks(date) {
  return Array.from({ length: 5 }, (_, i) =>
    format(subDays(date, 7 * i), 'yyyy-MM-dd')
  )
}

// Formatea fecha a string para queries
export function formatDateForQuery(date) {
  return format(date, 'yyyy-MM-dd')
}

// Nombres de meses en español
export const MESES = [
  'Ene','Feb','Mar','Abr','May','Jun',
  'Jul','Ago','Sep','Oct','Nov','Dic'
]

// Extrae el número de minutos de un string como "15 min" → 15
export function parseSampleMinutes(sample) {
  return parseInt(sample.trim().split(' ')[0])
}
