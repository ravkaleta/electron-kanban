import TaskList from './TaskList'

import { useProjectStore } from '../store/projectStore'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'
import SectionColorEdit from './SectionColorEdit'
import { hexToRgb } from '../utils/colors'
import { motion } from 'framer-motion'

interface Props {
  sectionId: string
}

const Section = ({ sectionId }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [editColor, setEditColor] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const sectionName = useProjectStore((state) => state.sections[sectionId].name)
  const sectionColor = useProjectStore(
    (state) => state.sections[sectionId].color
  )

  const sectionColorRGB = hexToRgb(sectionColor)

  const deleteSection = useProjectStore((state) => state.deleteSection)
  const changeSectionName = useProjectStore((state) => state.changeSectionName)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sectionId,
    data: { type: 'Section' },
    disabled: editMode,
  })

  const handleSectionDelete = () => {
    deleteSection(sectionId)
  }

  const handleNewSectionName = () => {
    changeSectionName(sectionId, newSectionName)
    setEditMode(false)
  }

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className='min-w-72 w-72 ml-4 h-fit rounded-md bg-black/10 border border-slate-800 font-manrope'
    >
      <div
        {...attributes}
        {...listeners}
        className='flex justify-between text-white font-bold border-b border-neutral-600 cursor-pointer rounded-t-md py-2 px-4'
        style={{
          userSelect: 'none',
          backgroundColor: sectionColor,
        }}
      >
        {!editMode ? (
          <h2 onDoubleClick={() => setEditMode(true)} className='w-40'>
            {sectionName}
          </h2>
        ) : (
          <input
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              e.key === 'Enter' && handleNewSectionName()
            }}
            value={newSectionName}
            onChange={({ target }) => setNewSectionName(target.value)}
            className='bg-transparent w-40'
          />
        )}
        <button onClick={() => setEditColor((prev) => !prev)}>C</button>
        <button onClick={handleSectionDelete} className=''>
          X
        </button>
      </div>
      <div className='p-2'>
        {!editColor ? (
          <TaskList sectionId={sectionId} />
        ) : (
          <SectionColorEdit sectionId={sectionId} color={sectionColor} />
        )}
      </div>
    </div>
  )
}

export default Section
