import React, { MouseEvent, useEffect, useState } from 'react'

interface props {
  colorHue: number
  onChange: (event: MouseEvent<HTMLDivElement>) => void
}

const HuePicker = ({ colorHue, onChange }: props) => {
  const [isMouseDown, setMouseDown] = useState(false)
  const [indicatorOffset, setIndicatorOffset] = useState(colorHue)

  useEffect(() => {
    setIndicatorOffset((colorHue / 360) * 100)
  }, [colorHue])

  return (
    <div
      className='w-64 h-8 relative'
      style={{
        background:
          'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
      }}
      onMouseDown={() => {
        setMouseDown(true)
      }}
      onMouseLeave={() => setMouseDown(false)}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={(event) => {
        if (isMouseDown) onChange(event)
      }}
    >
      <div
        className='absolute h-10 w-10 -translate-x-5 -translate-y-1 rounded-full shadow-black shadow-sm bg-white'
        style={{ left: indicatorOffset + '%' }}
      ></div>
    </div>
  )
}

export default HuePicker
