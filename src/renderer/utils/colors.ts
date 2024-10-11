import { componentToHex } from './utils'

export const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, '')

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  return { r, g, b }
}

export const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100
  v /= 100

  const i = ~~(h / 60)
  const f = h / 60 - i
  const p = v * (1 - s)
  const q = v * (1 - s * f)
  const t = v * (1 - s * (1 - f))
  const index = i % 6

  const r = Math.round([v, q, p, p, t, v][index] * 255)
  const g = Math.round([t, v, v, q, p, p][index] * 255)
  const b = Math.round([p, p, t, v, v, q][index] * 255)

  return { r, g, b }
}

export const hexToHsv = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6
    } else if (max === g) {
      h = (b - r) / delta + 2
    } else {
      h = (r - g) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : delta / max

  const v = max

  return { h, s: +(s * 100).toFixed(1), v: +(v * 100).toFixed(1) }
}

export const hsvToHex = (h: number, s: number, v: number) => {
  const { r, g, b } = hsvToRgb(h, s, v)

  return rgbToHex(r, g, b)
}
