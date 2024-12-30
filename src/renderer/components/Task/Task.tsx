import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../../shared/types'
import { useState } from 'react'
import TaskDetails from './TaskDetails'
import TaskForm from './TaskForm'
import { useProjectStore } from '../../store/projectStore'

interface Props {
  task: Task
  sectionId: string
  handleTaskDelete?: (taskId: string) => void
  handleTaskComplete?: (taskId: string) => void
  handleTaskProgress?: (taskId: string) => void
  isOverlay?: boolean
}

const Task = ({
  task,
  sectionId,
  handleTaskComplete,
  handleTaskProgress,
  handleTaskDelete,
  isOverlay = false,
}: Props) => {
  const [editMode, setEditMode] = useState(false)
  const isDraggingSection = useProjectStore((state) => state.isDraggingSection)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: 'Task', task, sectionId },
    disabled: editMode,
  })

  const style = {
    transition: `${transition}, background-image 0.3s ease `,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      style={style}
      ref={!isDraggingSection ? setNodeRef : undefined}
      {...(!isDraggingSection ? attributes : {})}
      {...(!isDraggingSection ? listeners : {})}
      className='mb-2 mr-[2px]'
    >
      {!editMode ? (
        <TaskDetails
          task={task}
          handleTaskComplete={handleTaskComplete}
          handleTaskDelete={handleTaskDelete}
          handleTaskProgress={handleTaskProgress}
          setEditMode={setEditMode}
          isOverlay={isOverlay}
        />
      ) : (
        <TaskForm
          sectionId={sectionId}
          currentTask={task}
          setEditMode={setEditMode}
        />
      )}
    </div>
  )
}

export default Task
