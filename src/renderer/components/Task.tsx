import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../shared/types'

interface Props {
  task: Task
  sectionId: string
  handleTaskDelete: (taskId: string) => void
  handleTaskComplete: (taskId: string) => void
}

const Task = ({
  task,
  sectionId,
  handleTaskComplete,
  handleTaskDelete,
}: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'Task', task, sectionId } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {task.content}
      <button onClick={() => handleTaskDelete(task.id)} className='float-end'>
        🗑
      </button>
      <button onClick={() => handleTaskComplete(task.id)} className='float-end'>
        ✓
      </button>
    </div>
  )
}

export default Task
