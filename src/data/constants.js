// src/data/constants.js
// diccionarios globales en el código Python/Streamlit

// Mapeo de nombre de canal a sus stream codes en Snowflake
export const CHANNEL_CODES = {
  'AZTECA 7':      ['CDMX-Azteca 7', 'MTY-Azteca 7', 'GDL-Azteca 7', 'INT-Azteca 7'],
  'AZTECA UNO':    ['CDMX-Azteca Uno', 'MTY-Azteca Uno', 'GDL-Azteca Uno', 'INT-Azteca Uno'],
  'CANAL 5':       ['CDMX-Canal 5', 'MTY-Canal 5', 'GDL-Canal 5', 'INT-Canal 5'],
  'CANAL 6':       ['CDMX-Canal 6', 'MTY-Canal 6', 'GDL-Canal 6', 'INT-Canal 6'],
  'IMAGEN TV':     ['CDMX-Imagen TV', 'MTY-Imagen TV', 'GDL-Imagen TV', 'INT-Imagen TV'],
  'LAS ESTRELLAS': ['CDMX-Las Estrellas', 'MTY-Las Estrellas', 'GDL-Las Estrellas', 'INT-Las Estrellas'],
  'NU9VE':         ['CDMX-Nu9ve', 'MTY-Nu9ve', 'GDL-Nu9ve', 'INT-Nu9ve'],
  'CANAL 4':       ['MTY-Canal 4', 'GDL-Canal 4'],
  'ADN40':         ['CDMX-adn noticias', 'MTY-adn noticias', 'GDL-adn noticias', 'INT-adn noticias'],
  'MILENIO':       ['CDMX-Milenio', 'MTY-Milenio TV', 'GDL-Milenio', 'INT-Milenio'],
  'N+ FORO':       ['CDMX-N+ FORO', 'MTY-N+ FORO', 'GDL-N+ FORO', 'INT-N+ FORO'],
}

// Mapeo inverso: stream code - nombre de canal
export const CHANNEL_REVERSE = Object.entries(CHANNEL_CODES).reduce((acc, [name, codes]) => {
  codes.forEach(code => { acc[code] = name })
  return acc
}, {})

// Canal - Región válida (para el CASE SQL)
export const CHANNEL_REGION = {
  'CDMX-Azteca 7': 'ZMVM',         'MTY-Azteca 7': 'ZM Monterrey',  'GDL-Azteca 7': 'ZM Guadalajara', 'INT-Azteca 7': 'Interior',
  'CDMX-Azteca Uno': 'ZMVM',       'MTY-Azteca Uno': 'ZM Monterrey', 'GDL-Azteca Uno': 'ZM Guadalajara','INT-Azteca Uno': 'Interior',
  'CDMX-Canal 5': 'ZMVM',          'MTY-Canal 5': 'ZM Monterrey',    'GDL-Canal 5': 'ZM Guadalajara',   'INT-Canal 5': 'Interior',
  'CDMX-Canal 6': 'ZMVM',          'MTY-Canal 6': 'ZM Monterrey',    'GDL-Canal 6': 'ZM Guadalajara',   'INT-Canal 6': 'Interior',
  'CDMX-Imagen TV': 'ZMVM',        'MTY-Imagen TV': 'ZM Monterrey',  'GDL-Imagen TV': 'ZM Guadalajara', 'INT-Imagen TV': 'Interior',
  'CDMX-Las Estrellas': 'ZMVM',    'MTY-Las Estrellas': 'ZM Monterrey','GDL-Las Estrellas': 'ZM Guadalajara','INT-Las Estrellas': 'Interior',
  'CDMX-Nu9ve': 'ZMVM',            'MTY-Nu9ve': 'ZM Monterrey',      'GDL-Nu9ve': 'ZM Guadalajara',     'INT-Nu9ve': 'Interior',
  'MTY-Canal 4': 'ZM Monterrey',   'GDL-Canal 4': 'ZM Guadalajara',
  'CDMX-adn noticias': 'ZMVM',     'MTY-adn noticias': 'ZM Monterrey','GDL-adn noticias': 'ZM Guadalajara','INT-adn noticias': 'Interior',
  'CDMX-Milenio': 'ZMVM',          'MTY-Milenio TV': 'ZM Monterrey', 'GDL-Milenio': 'ZM Guadalajara',   'INT-Milenio': 'Interior',
  'CDMX-N+ FORO': 'ZMVM',          'MTY-N+ FORO': 'ZM Monterrey',    'GDL-N+ FORO': 'ZM Guadalajara',   'INT-N+ FORO': 'Interior',
}

// Canales disponibles por región (selectbox de tab3)
export const CHANNELS_BY_REGION = {
  'ZMVM':           ['AZTECA 7','AZTECA UNO','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE','ADN40','MILENIO','N+ FORO'],
  'ZM Monterrey':   ['AZTECA 7','AZTECA UNO','CANAL 4','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE'],
  'ZM Guadalajara': ['AZTECA 7','AZTECA UNO','CANAL 4','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE'],
  'Interior':       ['AZTECA 7','AZTECA UNO','CANAL 5','CANAL 6','IMAGEN TV','LAS ESTRELLAS','NU9VE','ADN40','MILENIO','N+ FORO'],
}

// Conversión de nombre de región para display
export const REGION_DISPLAY = {
  'ZMVM':           'CDMX',
  'ZM Monterrey':   'Monterrey',
  'ZM Guadalajara': 'Guadalajara',
  'Interior':       'Interior',
}

// Lista de todos los canales (para selectbox simple)
export const ALL_CHANNELS = [
  'AZTECA 7','AZTECA UNO','CANAL 5','CANAL 6','IMAGEN TV',
  'LAS ESTRELLAS','NU9VE','ADN40','MILENIO','N+ FORO',
]

// Opciones de intervalo de tiempo
export const TIME_OPTIONS        = ['60 min', '30 min', '15 min', '10 min', '1 min']
export const TIME_OPTIONS_ENC    = ['60 min', '30 min', '15 min', '10 min']
export const TIME_OPTIONS_PROG   = ['15 min', '10 min', '5 min', '2 min', '1 min']

// Paleta de colores para gráficas 
export const CHART_PALETTE = ['#80c5fa','#f1a2a3','#7bec9f','#ffd16a','#be00fe']
export const OV_PALETTE    = ['#ff9999','#5b9bd5','#ed7d31','#ff0000','#00cc99','#92d050','#002060','#d5237c','#806000']

// Target por defecto
export const DEFAULT_TARGET = 'UNIVERSO_GV'
