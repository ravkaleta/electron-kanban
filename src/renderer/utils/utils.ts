export const clamp = (value: number, min: number, max: number) => {
  if (!max) {
    return Math.max(value, min) === min ? value : min
  } else if (Math.min(value, min) === value) {
    return min
  } else if (Math.max(value, max) === value) {
    return max
  }
  return value
}

export const componentToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}
