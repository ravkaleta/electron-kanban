import TaskList from './TaskList'

import { useProjectStore } from '../store/projectStore'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import SectionColorEdit from './SectionColorEdit'

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
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className='section-container min-w-64 w-64 h-full bg-neutral-900 ml-4 rounded-md shadow-black shadow-md border 
                border-neutral-800'
    >
      <div
        {...attributes}
        {...listeners}
        className='flex justify-between text-white font-bold pb-2 mb-2 border-b border-neutral-600 cursor-pointer rounded-t-md py-2 px-4'
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
      <div className='flex-1 p-4'>
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
