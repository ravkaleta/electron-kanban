import React, { MouseEvent, useEffect, useState } from 'react'
import { useProjectStore } from '../../store/projectStore'

interface props {
  colorHue: number
  onChange: (event: MouseEvent<HTMLDivElement>) => void
}

const HuePicker = ({ colorHue, onChange }: props) => {
  const [isMouseDown, setMouseDown] = useState(false)
  const [indicatorOffset, setIndicatorOffset] = useState(colorHue)
  const saveProject = useProjectStore((state) => state.saveProject)

  useEffect(() => {
    setIndicatorOffset((colorHue / 360) * 100)
  }, [colorHue])

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

  return (
    <div
      className='w-64 h-6 relative'
      style={{
        background:
          'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
      }}
      onMouseDown={() => {
        setMouseDown(true)
      }}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={(event) => {
        if (isMouseDown) onChange(event)
      }}
    >
      <div
        className='absolute h-8 w-8 -translate-x-5 -translate-y-1 rounded-full shadow-black shadow-sm bg-white'
        style={{ left: indicatorOffset + '%' }}
      ></div>
    </div>
  )
}

export default HuePicker
