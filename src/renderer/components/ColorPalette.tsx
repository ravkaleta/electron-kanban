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
      <button
        className='w-6 h-6 bg-neutral-600'
        onClick={() => handleColorChange('#525252')}
      />
    </div>
  )
}

export default ColorPalette
