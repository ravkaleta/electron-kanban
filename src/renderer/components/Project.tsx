import { useProjectStore } from '../store/projectStore'
import Section from './Section'
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Task as ITask } from '../../shared/types'
import TaskOverlay from './TaskOverlay'

const Project = () => {
  const [activeSection, setActiveSection] = useState<UniqueIdentifier | null>(
    null
  )
  const [activeTask, setActiveTask] = useState<ITask | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  )

  const sectionsInOrder = useProjectStore((state) => state.sectionOrder)
  const addSection = useProjectStore((state) => state.addSection)
  const reorderSections = useProjectStore((state) => state.reorderSections)
  const reorderTasks = useProjectStore((state) => state.reorderTasks)
  const moveTaskToSection = useProjectStore((state) => state.moveTaskToSection)

  const handleNewSection = () => {
    addSection()
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Section') {
      setActiveSection(event.active.id)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task as ITask)
    }
  }

  const onDragEnd = (event: DragOverEvent) => {
    const { active, over } = event

    if (!activeSection) return
    setActiveSection(null)
    if (!over) return
    if (activeTask) {
      setActiveTask(null)
      return
    }
    if (activeSection === over.id) return

    const activeSectionIndex = sectionsInOrder.findIndex(
      (s) => s === active.id.toString()
    )

    const overSectionIndex = sectionsInOrder.findIndex(
      (s) => s === over.id.toString()
    )

    reorderSections(
      arrayMove(sectionsInOrder, activeSectionIndex, overSectionIndex)
    )
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!activeTask) return
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isOverTask = over.data.current?.type === 'Task'
    const isOverSection = over.data.current?.type === 'Section'

    if (isOverTask) {
      console.log('ACTIVE', active.data.current.sectionId)
      console.log('Over', over.data.current.sectionId)
      if (active.data.current.sectionId !== over.data.current.sectionId) {
        moveTaskToSection(
          active.data.current.task,
          active.data.current.sectionId,
          over.data.current.sectionId
        )
      } else {
        reorderTasks(
          over.data.current?.sectionId,
          activeId.toString(),
          overId.toString()
        )
      }
    } else if (isOverSection) {
      if (active.data.current.sectionId !== over.id) {
        moveTaskToSection(
          active.data.current.task,
          active.data.current.sectionId,
          over.id.toString()
        )
      }
    }
  }

  return (
    <div className='flex w-full h-full py-4 overflow-y-clip overflow-x-scroll'>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={sectionsInOrder}>
          {sectionsInOrder.map((sectionId) => (
            <Section sectionId={sectionId} key={sectionId} />
          ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeSection && <Section sectionId={activeSection.toString()} />}
            {activeTask && <TaskOverlay task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <div className='flex items-center justify-center min-w-64 w-64 h-full'>
        <button
          onClick={handleNewSection}
          className='w-24 h-24 bg-neutral-700 border border-neutral-600 rounded-xl shadow-black shadow-sm'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Project
