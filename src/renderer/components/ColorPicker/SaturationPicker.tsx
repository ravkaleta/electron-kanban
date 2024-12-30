import React, { MouseEvent, useEffect, useState } from 'react'
import { hsvToRgb } from '../../../renderer/utils/colors'
import { useProjectStore } from '../../store/projectStore'

interface props {
  hue: number
  saturation: number
  value: number
  onChange: (event: MouseEvent<HTMLDivElement>) => void
}

const SaturationPicker = ({ hue, saturation, value, onChange }: props) => {
  const [isMouseDown, setMouseDown] = useState(false)
  const [coords, setCoords] = useState(null)
  const { r, g, b } = hsvToRgb(hue, saturation, value)

  const saveProject = useProjectStore((state) => state.saveProject)

  const getSatCoords = () => {
    setCoords({ x: saturation, y: 100 - value })
  }

  const handleMouseUp = () => {
    saveProject()
    setMouseDown(false)
  }

  const handleMouseLeave = () => {
    if (isMouseDown === true) {
      saveProject()
      setMouseDown(false)
    }
  }

  useEffect(() => {
    getSatCoords()
  }, [saturation, value])

  if (!coords) {
    return
  }

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
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
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
