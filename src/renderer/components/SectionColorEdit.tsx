import { useState } from 'react'
import ColorPalette from './ColorPalette'
import ColorPicker from './ColorPicker/ColorPicker'
import { useProjectStore } from '../store/projectStore'

interface Props {
  sectionId: string
  color: string
}

const SectionColorEdit = ({ sectionId, color }: Props) => {
  const [colorPicker, setColorPicker] = useState(false)
  const changeSectionColor = useProjectStore(
    (state) => state.changeSectionColor
  )

  const handleColorChange = (newColor: string) => {
    changeSectionColor(sectionId, newColor)
  }

  return (
    <div className='text-white '>
      <div className='flex justify-evenly'>
        <button onClick={() => setColorPicker(false)}>Palette</button>
        <button onClick={() => setColorPicker(true)}>Picker</button>
      </div>
      {colorPicker ? (
        <ColorPicker handleColorChange={handleColorChange} color={color} />
      ) : (
        <ColorPalette handleColorChange={handleColorChange} />
      )}
    </div>
  )
}

export default SectionColorEdit
