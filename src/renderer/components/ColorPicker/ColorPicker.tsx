import { MouseEvent } from 'react'
import { hexToHsv, hsvToHex } from '../../utils/colors'
import { clamp } from '../../utils/utils'
import SaturationPicker from './SaturationPicker'
import HuePicker from './HuePicker'

interface Props {
  color: string
  handleColorChange: (newColor: string) => void
}

const ColorPicker = ({ handleColorChange, color }: Props) => {
  const { h: hue, s: saturation, v: value } = hexToHsv(color)

  const handleSaturationChange = (event: MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } =
      event.currentTarget.getBoundingClientRect()

    const x = clamp(event.clientX - left, 0, width)
    const y = clamp(event.clientY - top, 0, height)

    const s = (x / width) * 100
    const v = 100 - (y / height) * 100

    const hex = hsvToHex(hue, s, v)

    handleColorChange(hex)
  }

  const handleHueChange = (event: MouseEvent<HTMLDivElement>) => {
    const { width, left } = event.currentTarget.getBoundingClientRect()

    const x = clamp(event.clientX - left, 0, width)
    const h = (x / width) * 360

    const hex = hsvToHex(h, saturation, value)

    handleColorChange(hex)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-y-2'>
      <SaturationPicker
        hue={hue}
        saturation={saturation}
        value={value}
        onChange={handleSaturationChange}
      />
      <HuePicker colorHue={hue} onChange={handleHueChange} />
    </div>
  )
}

export default ColorPicker
