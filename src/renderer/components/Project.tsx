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
import SectionList from './SectionList'
import Task from './Task'

const Project = () => {
  const [activeSection, setActiveSection] = useState<UniqueIdentifier | null>(
    null
  )
  const [activeTask, setActiveTask] = useState<{
    task: ITask
    sectionId: string
  } | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  )

  const projectId = useProjectStore((state) => state.id)
  const sectionsInOrder = useProjectStore((state) => state.sectionOrder)
  const reorderSections = useProjectStore((state) => state.reorderSections)
  const reorderTasks = useProjectStore((state) => state.reorderTasks)
  const moveTaskToSection = useProjectStore((state) => state.moveTaskToSection)

  if (!projectId) {
    return (
      <div className='flex-1 flex justify-center items-center text-white'>
        Create your first project
      </div>
    )
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Section') {
      setActiveSection(event.active.id)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask({
        task: event.active.data.current.task as ITask,
        sectionId: event.active.data.current.sectionId as string,
      })
    }
  }

  const onDragEnd = (event: DragOverEvent) => {
    const { active, over } = event

    if (activeTask) {
      setActiveTask(null)
      return
    }
    if (!activeSection) return
    setActiveSection(null)
    if (!over) return

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
    <div className='w-full h-full z-10'>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={sectionsInOrder}>
          <SectionList sectionsInOrder={sectionsInOrder} />
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeSection && <Section sectionId={activeSection.toString()} />}
            {activeTask && (
              <Task task={activeTask.task} sectionId={activeTask.sectionId} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default Project
