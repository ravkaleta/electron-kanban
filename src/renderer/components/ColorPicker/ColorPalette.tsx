import { readyColors } from '../../../shared/constants'

interface Props {
  handleColorChange: (newColor: string) => void
}

const ColorPalette = ({ handleColorChange }: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-1'>
      {readyColors.map((c) => (
        <button
          key={c}
          onClick={() => handleColorChange(c)}
          style={{ backgroundColor: c }}
          className='w-6 h-6 rounded-sm'
        />
      ))}
    </div>
  )
}

export default ColorPalette
