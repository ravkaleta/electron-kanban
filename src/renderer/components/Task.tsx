import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../shared/types'
import { Clock, Settings, Trash } from 'react-feather'
import { useRef, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

interface Props {
  task: Task
  sectionId: string
  handleTaskDelete?: (taskId: string) => void
  handleTaskComplete?: (taskId: string) => void
  handleTaskProgress?: (taskId: string) => void
}

const Task = ({
  task,
  sectionId,
  handleTaskComplete,
  handleTaskProgress,
  handleTaskDelete,
}: Props) => {
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const optionsRef = useRef<HTMLDivElement>(null)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'Task', task, sectionId } })

  useClickOutside(() => setOptionsVisible(false), optionsRef)

  const style = {
    transition: `${transition}, background-image 0.3s ease `,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='relative group text-white rounded-md p-2 mb-2 bg-slate-800 font-manrope'
    >
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-emerald-800 transition-opacity pointer-events-none rounded-md ${
          task.completed ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {task.inProgress && (
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent animate-gradient bg-[length:200%_auto]' />
      )}
      <div className='relative z-10'>
        <div
          className={`flex items-center pb-2 border-b ${
            task.completed
              ? 'border-emerald-600/30'
              : task.inProgress
              ? 'border-amber-600/30'
              : 'border-slate-700'
          }`}
        >
          <h1 className='pl-2 font-bold w-4/5'>{task.title}</h1>
          {handleTaskComplete && handleTaskDelete && handleTaskProgress && (
            <div className='w-1/5 grid grid-cols-2 opacity-10 group-hover:opacity-100 text-slate-400 transition-opacity'>
              <button
                onClick={() => handleTaskComplete(task.id)}
                className='flex items-center justify-center w-full aspect-square rounded-md hover:bg-black/20 hover:text-emerald-600 transition-all'
              >
                ✓
              </button>
              <button
                onClick={() => handleTaskProgress(task.id)}
                className='flex items-center justify-center w-full aspect-square rounded-md hover:bg-black/20 hover:text-amber-600 transition-all'
              >
                <Clock size={16} />
              </button>
              <button
                onClick={() => setEditMode(true)}
                className='flex items-center justify-center w-full aspect-square rounded-md hover:bg-black/20 hover:text-blue-600 transition-all'
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => handleTaskDelete(task.id)}
                className='flex items-center justify-center w-full aspect-square rounded-md hover:bg-black/20 hover:text-red-600 transition-all'
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>

        <p className='text-sm mt-2'>{task.description}</p>
      </div>
    </div>
  )
}

export default Task
