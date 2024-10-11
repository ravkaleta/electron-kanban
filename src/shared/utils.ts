import { v4 as uuidv4 } from 'uuid'
import { readyColors } from './constants'

export const getUniqueId = () => {
  return uuidv4()
}

export const getRandomInt = (max: number, min = 0) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)

  return '#' + randomColor
}

export const getRandomPreparedColor = () => {
  const random = getRandomInt(readyColors.length)
  return readyColors[random]
}
