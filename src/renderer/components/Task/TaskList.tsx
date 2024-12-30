import { useProjectStore } from '../../store/projectStore'
import TaskForm from './TaskForm'
import Task from './Task'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

interface Props {
  sectionId: string
}

const TaskList = ({ sectionId }: Props) => {
  const completeTask = useProjectStore((state) => state.completeTask)
  const progressTask = useProjectStore((state) => state.progressTask)
  const deleteTask = useProjectStore((state) => state.deleteTask)
  const tasks = useProjectStore((state) => state.sections[sectionId].tasks)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  )

  const tasksId = useMemo(() => tasks.map((t) => t.id), [tasks])

  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId, sectionId)
  }

  const handleTaskProgress = (taskId: string) => {
    progressTask(taskId, sectionId)
  }

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId, sectionId)
  }

  return (
    <div className='text-white max-h-[calc(100vh-12rem)] overflow-y-auto'>
      <SortableContext items={tasksId}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            sectionId={sectionId}
            handleTaskComplete={handleTaskComplete}
            handleTaskDelete={handleTaskDelete}
            handleTaskProgress={handleTaskProgress}
          />
        ))}
      </SortableContext>
      <TaskForm sectionId={sectionId} />
    </div>
  )
}

export default TaskList
