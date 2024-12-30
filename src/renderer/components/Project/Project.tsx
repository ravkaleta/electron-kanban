import { useProjectStore } from '../../store/projectStore'
import Section from '../Section/Section'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Task as ITask } from '../../../shared/types'
import SectionList from '../Section/SectionList'
import Task from '../Task/Task'

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
  const saveProject = useProjectStore((state) => state.saveProject)

  const setDraggingSection = useProjectStore(
    (state) => state.setDraggingSection
  )

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
      setDraggingSection(true)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask({
        task: event.active.data.current.task as ITask,
        sectionId: event.active.data.current.sectionId as string,
      })
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { over } = event
    if (activeTask) {
      saveProject()
      setActiveTask(null)
      return
    }
    if (!over) return

    if (activeSection) {
      const activeSectionId = activeSection
      setActiveSection(null)
      setDraggingSection(false)

      if (activeSection === over.id) return

      const activeSectionIndex = sectionsInOrder.findIndex(
        (s) => s === activeSectionId.toString()
      )
      const overSectionIndex = sectionsInOrder.findIndex(
        (s) => s === over.id.toString()
      )
      reorderSections(
        arrayMove(sectionsInOrder, activeSectionIndex, overSectionIndex)
      )

      saveProject()
    }
  }

  const onDragOver = (event: DragOverEvent) => {
    const { over } = event
    console.log(over)
    if (!activeTask || !over || activeTask.task.id === over.id) return
    const isOverTask = over.data.current?.type === 'Task'
    const isOverSection = over.data.current?.type === 'Section'

    if (isOverTask) {
      if (activeTask.sectionId !== over.data.current.sectionId) {
        moveTaskToSection(
          activeTask.task,
          activeTask.sectionId,
          over.data.current.sectionId,
          over.data.current.task.id
        )
        setActiveTask((prev) => ({
          ...prev,
          sectionId: over.data.current.sectionId,
        }))
      } else {
        reorderTasks(
          over.data.current?.sectionId,
          activeTask.task.id.toString(),
          over.data.current.task.id.toString()
        )
      }
    }

    if (isOverSection && activeTask.sectionId !== over.id) {
      moveTaskToSection(
        activeTask.task,
        activeTask.sectionId,
        over.id.toString()
      )
      setActiveTask((prev) => ({
        ...prev,
        sectionId: over.id.toString(),
      }))
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
              <Task
                task={activeTask.task}
                sectionId={activeTask.sectionId}
                isOverlay={true}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default Project
