import React, { MouseEvent, useEffect, useState } from 'react'
import { hsvToRgb } from '../../../renderer/utils/colors'

interface props {
  hue: number
  saturation: number
  value: number
  onChange: (event: MouseEvent<HTMLDivElement>) => void
}

const SaturationPicker = ({ hue, saturation, value, onChange }: props) => {
  const [isMouseDown, setMouseDown] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const { r, g, b } = hsvToRgb(hue, saturation, value)

  const getSatCoords = () => {
    setCoords({ x: saturation, y: 100 - value })
  }

  useEffect(() => {
    getSatCoords()
  }, [saturation, value])

  return (
    <div
      className='w-64 h-32 cursor-crosshair relative'
      style={{
        backgroundColor: `hsl(${hue}, 100%, 50%)`,
        backgroundImage:
          'linear-gradient(transparent, black), linear-gradient(to right, white, transparent)',
      }}
      onMouseDown={() => setMouseDown(true)}
      onMouseMove={(event) => {
        if (isMouseDown) {
          onChange(event)
        }
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
    >
      <div
        className='absolute -translate-x-4 -translate-y-4 w-8 h-8 rounded-full bg-transparent border border-white'
        style={{
          left: coords.x + '%',
          top: coords.y + '%',
          background: `rgb(${r}, ${g}, ${b})`,
        }}
      ></div>
    </div>
  )
}

export default SaturationPicker
