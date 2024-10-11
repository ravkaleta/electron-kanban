import { Task } from '../../shared/types'

interface Props {
  task: Task
}

const TaskOverlay = ({ task }: Props) => {
  return (
    <div className='text-white bg-neutral-600 border border-neutral-500 rounded-sm'>
      {task.content}
    </div>
  )
}

export default TaskOverlay
