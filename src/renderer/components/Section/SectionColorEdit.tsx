import { useState } from 'react'
import ColorPalette from '../ColorPicker/ColorPalette'
import ColorPicker from '../ColorPicker/ColorPicker'
import { useProjectStore } from '../../store/projectStore'

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
    <div className='text-white flex-col items-center'>
      <div className='relative mx-auto flex w-2/3 items-center justify-evenly'>
        <div
          className='absolute w-1/2 h-full bg-white/10 border-slate-500 border rounded-md transition-all duration-200'
          style={{ left: colorPicker ? '50%' : '0' }}
        />
        <button onClick={() => setColorPicker(false)} className='z-10 w-1/2'>
          Palette
        </button>
        <button onClick={() => setColorPicker(true)} className='z-10  w-1/2'>
          Picker
        </button>
      </div>
      <div className='mt-2'>
        {colorPicker ? (
          <ColorPicker handleColorChange={handleColorChange} color={color} />
        ) : (
          <ColorPalette handleColorChange={handleColorChange} />
        )}
      </div>
    </div>
  )
}

export default SectionColorEdit
