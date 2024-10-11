import { useState, SyntheticEvent } from 'react'
import { useProjectStore } from '../store/projectStore'
import { getUniqueId } from '../../shared/utils'

const NewTaskForm = ({ sectionId }: { sectionId: string }) => {
  const [newTask, setNewTask] = useState('')
  const addTask = useProjectStore((state) => state.addTask)

  const handleNewTask = (event: SyntheticEvent) => {
    event.preventDefault()
    const task = {
      id: getUniqueId(),
      content: newTask,
      completed: false,
    }
    addTask(task, sectionId)
  }

  return (
    <form onSubmit={handleNewTask}>
      <input
        value={newTask}
        onChange={({ target }) => setNewTask(target.value)}
        className='text-black bg-neutral-700 border border-neutral-600'
      />
      <button type='submit' className='p-2 text-white '>
        +
      </button>
    </form>
  )
}

export default NewTaskForm
