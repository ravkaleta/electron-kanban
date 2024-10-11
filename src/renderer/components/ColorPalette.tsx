import { readyColors } from '../../shared/constants'

interface Props {
  handleColorChange: (newColor: string) => void
}

const ColorPalette = ({ handleColorChange }: Props) => {
  return (
    <div className=''>
      {readyColors.map((c) => (
        <button
          key={c}
          onClick={() => handleColorChange(c)}
          style={{ backgroundColor: c }}
          className='w-6 h-6'
        />
      ))}
    </div>
  )
}

export default ColorPalette
