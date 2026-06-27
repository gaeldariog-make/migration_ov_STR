// src/api/ratings.js
// FASE 1 (ahora): usa mockData  → todo funciona sin backend
// FASE 2 (FastAPI): cambia USE_MOCK a false y escribe los fetch reales abajo
//
// Nunca toques los componentes — solo este archivo cambia entre fases.

import {
  mockGetRatingMonthly,
  mockGetRatingNDaysNacional,
  mockGetRatingMonthlyRegion,
  mockGetRatingNDays,
  mockGetRatingHourWithProgram,
  mockGetRatingOvernight,
  mockGetRatingSenalesRegion,
  mockGetEncendidos,
} from '../data/mockData'

const USE_MOCK = true // ← Cambia a false cuando tengas FastAPI listo
const API_BASE = '/api' // ← URL de tu FastAPI (via proxy de Vite)

// ─── Tab 1: Rating Histórico Mensual ─────────────────────────────────────────
export async function getRatingMonthly({ channel, target, date }) {
  if (USE_MOCK) {
    await delay(400)
    return mockGetRatingMonthly(channel)
  }
  const res = await fetch(`${API_BASE}/rating/monthly?channel=${channel}&target=${target}&date=${date}`)
  return res.json()
}

// ─── Tab 2: Rating Nacional ───────────────────────────────────────────────────
export async function getRatingNDaysNacional({ date, channels, target, startHour, endHour }) {
  if (USE_MOCK) {
    await delay(500)
    return mockGetRatingNDaysNacional(date, startHour, endHour)
  }
  const res = await fetch(`${API_BASE}/rating/nacional`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, channels, target, startHour, endHour }),
  })
  return res.json()
}

// ─── Tab 3: Rating Histórico Regional ────────────────────────────────────────
export async function getRatingMonthlyRegion({ region, channel, target, date }) {
  if (USE_MOCK) {
    await delay(400)
    return mockGetRatingMonthlyRegion(region, channel)
  }
  const res = await fetch(`${API_BASE}/rating/monthly-region`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ region, channel, target, date }),
  })
  return res.json()
}

// ─── Tab 4: Rating Regiones ───────────────────────────────────────────────────
export async function getRatingNDays({ date, region, channel, target, startHour, endHour }) {
  if (USE_MOCK) {
    await delay(500)
    return mockGetRatingNDays(date, channel)
  }
  const res = await fetch(`${API_BASE}/rating/regions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, region, channel, target, startHour, endHour }),
  })
  return res.json()
}

// ─── Tab 5: Evolución Semanal por Hora ───────────────────────────────────────
export async function getRatingHourWithProgram({ date, region, channel, target, sample }) {
  if (USE_MOCK) {
    await delay(600)
    return mockGetRatingHourWithProgram(date, region, channel)
  }
  const res = await fetch(`${API_BASE}/rating/hour-program`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, region, channel, target, sample }),
  })
  return res.json()
}

// ─── Tab 6: Overnight ─────────────────────────────────────────────────────────
export async function getRatingOvernight({ date, region, channels, target, sample }) {
  if (USE_MOCK) {
    await delay(500)
    return mockGetRatingOvernight(date, region)
  }
  const res = await fetch(`${API_BASE}/rating/overnight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, region, channels, target, sample }),
  })
  return res.json()
}

// ─── Tab 7: Encendidos Evolución Semanal ─────────────────────────────────────
export async function getRatingSenalesRegion({ date, region, channel, target, sample }) {
  if (USE_MOCK) {
    await delay(500)
    return mockGetRatingSenalesRegion(date, region)
  }
  const res = await fetch(`${API_BASE}/rating/senales-region`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, region, channel, target, sample }),
  })
  return res.json()
}

// ─── Tab 8: Encendidos ────────────────────────────────────────────────────────
export async function getEncendidos({ date, region, sample, target }) {
  if (USE_MOCK) {
    await delay(400)
    return mockGetEncendidos(date, region, sample)
  }
  const res = await fetch(`${API_BASE}/rating/encendidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, region, sample, target }),
  })
  return res.json()
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms))
