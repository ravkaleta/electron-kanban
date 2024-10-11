import { Reorder } from 'framer-motion'
import { useProjectStore } from '../store/projectStore'
import NewTaskForm from './NewTaskForm'
import Task from './Task'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useCallback, useMemo } from 'react'

interface Props {
  sectionId: string
}

const TaskList = ({ sectionId }: Props) => {
  const completeTask = useProjectStore((state) => state.completeTask)
  const deleteTask = useProjectStore((state) => state.deleteTask)
  const tasks = useProjectStore((state) => state.sections[sectionId].tasks)

  const tasksId = useMemo(() => tasks.map((t) => t.id), [tasks])

  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId, sectionId)
  }

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId, sectionId)
  }

  return (
    <div className='text-white'>
      <SortableContext items={tasksId}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            sectionId={sectionId}
            handleTaskComplete={handleTaskComplete}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
      </SortableContext>
      <NewTaskForm sectionId={sectionId} />
    </div>
  )
}

export default TaskList
