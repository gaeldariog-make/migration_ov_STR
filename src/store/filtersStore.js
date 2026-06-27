// src/store/filtersStore.js
// Equivalente a st.session_state en Streamlit.
// Todos los filtros globales viven aquí: fecha, canal, target, etc.
// Cualquier componente puede leer o escribir sin pasar props hacia abajo.

import { create } from 'zustand'
import { subDays } from 'date-fns'
import { DEFAULT_TARGET, TIME_OPTIONS, TIME_OPTIONS_ENC } from '../data/constants'

const yesterday = subDays(new Date(), 1)

export const useFiltersStore = create((set) => ({
  // ─── Filtros globales ───────────────────────────────────────────────────────
  selectedDate:   yesterday,
  dataProvider:   'HR Media',       // 'HR Media' | 'Nielsen IBOPE'
  target:         DEFAULT_TARGET,

  // ─── Filtros por tab ────────────────────────────────────────────────────────
  // Tab 1
  channelTab1:    'CANAL 6',

  // Tab 2
  channelsTab2:   ['CANAL 6'],
  startHourTab2:  '05',
  endHourTab2:    '26',

  // Tab 3
  regionTab3:     'ZM Monterrey',
  channelTab3:    'CANAL 6',

  // Tab 4
  channelTab4:    'CANAL 6',
  startHourTab4:  '05',
  endHourTab4:    '26',

  // Tab 5
  channelTab5:    'CANAL 6',
  sampleTab5:     '15 min',

  // Tab 6 (overnight)
  sampleTab6:     '15 min',

  // Tab 7
  channelTab7:    'TOTAL OVERNIGHT',
  sampleTab7:     '15 min',

  // Tab 8
  sampleTab8:     '15 min',

  // ─── Setters ────────────────────────────────────────────────────────────────
  setSelectedDate:  (date)    => set({ selectedDate: date }),
  setDataProvider:  (p)       => set({ dataProvider: p }),
  setChannelTab1:   (ch)      => set({ channelTab1: ch }),
  setChannelsTab2:  (chs)     => set({ channelsTab2: chs }),
  setStartHourTab2: (h)       => set({ startHourTab2: h }),
  setEndHourTab2:   (h)       => set({ endHourTab2: h }),
  setRegionTab3:    (r)       => set({ regionTab3: r }),
  setChannelTab3:   (ch)      => set({ channelTab3: ch }),
  setChannelTab4:   (ch)      => set({ channelTab4: ch }),
  setStartHourTab4: (h)       => set({ startHourTab4: h }),
  setEndHourTab4:   (h)       => set({ endHourTab4: h }),
  setChannelTab5:   (ch)      => set({ channelTab5: ch }),
  setSampleTab5:    (s)       => set({ sampleTab5: s }),
  setSampleTab6:    (s)       => set({ sampleTab6: s }),
  setChannelTab7:   (ch)      => set({ channelTab7: ch }),
  setSampleTab7:    (s)       => set({ sampleTab7: s }),
  setSampleTab8:    (s)       => set({ sampleTab8: s }),
}))
