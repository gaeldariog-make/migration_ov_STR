// src/data/mockData.js
// Datos de prueba para que la app funcione sin conexión a Snowflake.
// Cuando conectes FastAPI, este archivo ya no se usa — solo cambias las
// llamadas en src/api/ratings.js para que apunten a tu backend real.

import { subDays, format, addMinutes, setHours, setMinutes } from 'date-fns'

const today = new Date()
const CHANNELS = ['CANAL 6', 'LAS ESTRELLAS', 'AZTECA 7', 'AZTECA UNO', 'CANAL 5', 'NU9VE']

// Helpers 
function randomRating(base = 50, spread = 30) {
  return parseFloat((base + (Math.random() * spread - spread / 2)).toFixed(1))
}

function getLast5Weeks(date) {
  return Array.from({ length: 5 }, (_, i) => format(subDays(date, 7 * i), 'yyyy-MM-dd'))
}

// Tab 1: Rating Histórico Mensual 
export function mockGetRatingMonthly(channel = 'CANAL 6') {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return months.map(month => ({
    MONTH: month,
    2024: channel === 'CANAL 6' ? randomRating(55, 20) : randomRating(40, 20),
    2025: channel === 'CANAL 6' ? randomRating(60, 20) : randomRating(45, 20),
  }))
}

//  Tab 2: Rating Nacional (últimos 30 días) 
export function mockGetRatingNDaysNacional(date = today, startHour = '05', endHour = '26') {
  return Array.from({ length: 30 }, (_, i) => {
    const d = format(subDays(date, 29 - i), 'yyyy-MM-dd')
    const row = { DATE_COLUMN: d }
    CHANNELS.forEach(ch => {
      row[ch] = randomRating(ch === 'CANAL 6' ? 65 : 45, 25)
    })
    return row
  })
}

//  Tab 3: Rating Histórico Regional (mensual por región) 
export function mockGetRatingMonthlyRegion(region = 'ZM Monterrey', channel = 'CANAL 6') {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return months.map(month => ({
    MONTH: month,
    2024: randomRating(50, 25),
    2025: randomRating(55, 25),
  }))
}

//  Tab 4: Rating Regiones (últimos 30 días por región) 
export function mockGetRatingNDays(date = today, channel = 'CANAL 6') {
  const regions = ['ZMVM', 'ZM Monterrey', 'ZM Guadalajara', 'Interior']
  return Array.from({ length: 30 }, (_, i) => {
    const d = format(subDays(date, 29 - i), 'yyyy-MM-dd')
    const row = { DATE_COLUMN: d }
    regions.forEach(r => {
      row[r] = randomRating(50, 30)
    })
    return row
  })
}

//  Tab 5: Evolución Semanal por hora 
const PROGRAMS = [
  'Hechos MTY', 'Ventaneando', 'Película', 'Noticiero', 'Serie', 'Reality',
  'Noticias Noche', 'Deportes', 'Talk Show', 'Documental'
]

export function mockGetRatingHourWithProgram(date = today, region = 'ZM Monterrey', channel = 'CANAL 6') {
  const dates5weeks = getLast5Weeks(date)
  // Genera ratings por hora (5h a 26h = 21 horas), por cada una de las 5 semanas
  const hours = Array.from({ length: 84 }, (_, i) => 5 + i / 4) // cada 15 min de 5:00 a 26:00

  return hours.map(hour => {
    const row = { HOUR_NUMERIC: parseFloat(hour.toFixed(4)) }
    dates5weeks.forEach((d, wi) => {
      row[`RATING_${d}`]  = randomRating(60 - wi * 5, 30)
      row[`PROGRAM_${d}`] = PROGRAMS[Math.floor(Math.random() * PROGRAMS.length)]
    })
    return row
  })
}

//  Tab 6: Overnight 
export function mockGetRatingOvernight(date = today, region = 'ZM Monterrey') {
  const channels_ov = region === 'ZMVM'
    ? ['ADN40','AZTECA 7','AZTECA UNO','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','MILENIO','N+ FORO','NU9VE']
    : ['AZTECA 7','AZTECA UNO','CANAL 4','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE']

  const start = setHours(setMinutes(date, 0), 5)
  return Array.from({ length: 84 }, (_, i) => {
    const ts = addMinutes(start, i * 15)
    const row = { TIMESTAMP: ts.toISOString() }
    channels_ov.forEach(ch => {
      row[ch] = randomRating(ch === 'CANAL 6' ? 70 : 50, 30)
    })
    return row
  })
}

//  Tab 7: Encendidos Evolución Semanal 
export function mockGetRatingSenalesRegion(date = today, region = 'ZM Monterrey') {
  const dates5weeks = getLast5Weeks(date)
  const hours = Array.from({ length: 84 }, (_, i) => 5 + i / 4)
  return hours.map(hour => {
    const row = { HOUR_NUMERIC: parseFloat(hour.toFixed(4)) }
    dates5weeks.forEach(d => {
      row[`TOTAL_${d}`]    = randomRating(3000, 800)
      row[`TOTAL_OV_${d}`] = randomRating(2500, 700)
    })
    return row
  })
}

//  Tab 8: Encendidos (share + rating) 
export function mockGetEncendidos(date = today, region = 'ZM Monterrey', sample = '15') {
  const channels_enc = ['CANAL 6', 'LAS ESTRELLAS', 'AZTECA 7', 'AZTECA UNO', 'NU9VE', 'CANAL 5']
  const start = setHours(setMinutes(date, 0), 5)
  const intervalMin = parseInt(sample)
  const slots = Math.floor((21 * 60) / intervalMin)

  return Array.from({ length: slots }, (_, i) => {
    const ts = addMinutes(start, i * intervalMin)
    const row = { TIMESTAMP: ts.toISOString() }
    channels_enc.forEach(ch => {
      row[`RATING_${ch}`] = randomRating(ch === 'CANAL 6' ? 65 : 45, 20)
      row[`SHARE_${ch}`]  = randomRating(ch === 'CANAL 6' ? 18 : 12, 8)
    })
    return row
  })
}
