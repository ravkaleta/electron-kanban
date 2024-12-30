import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Clock, Settings, Trash } from 'react-feather'
import { Task } from '../../../shared/types'
import ArrowDownIcon from '../../assets/icons/arrowDownIcon.svg'
import ArrowUpIcon from '../../assets/icons/arrowUpIcon.svg'
import useClickOutside from '../../hooks/useClickOutside'

interface Props {
  task: Task
  handleTaskDelete?: (taskId: string) => void
  handleTaskComplete?: (taskId: string) => void
  handleTaskProgress?: (taskId: string) => void
  setEditMode: Dispatch<SetStateAction<boolean>>
  isOverlay: boolean
}

const TaskDetails = ({
  task,
  handleTaskComplete,
  handleTaskProgress,
  handleTaskDelete,
  setEditMode,
  isOverlay,
}: Props) => {
  const [isDescriptionVisible, setDescriptionVisibility] = useState(false)
  const taskRef = useRef(null)

  useClickOutside(() => setDescriptionVisibility(false), taskRef)

  return (
    <div
      ref={taskRef}
      className='relative group text-white rounded-md p-2 bg-slate-800 font-manrope'
    >
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-emerald-800 transition-opacity pointer-events-none rounded-md ${
          task.completed ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {task.inProgress && (
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent animate-gradient rounded-md bg-[length:200%_auto]' />
      )}
      <div className='relative z-10'>
        <div
          className={`flex items-center ${
            task.description ? 'border-b pb-2' : ''
          } min-h-20 ${
            task.completed
              ? 'border-emerald-600/30'
              : task.inProgress
              ? 'border-amber-600/30'
              : 'border-slate-700'
          }`}
        >
          <h1 className='pl-2 font-bold w-4/5 overflow-hidden'>{task.title}</h1>
          {!isOverlay && (
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
        {task.description ? (
          !isDescriptionVisible ? (
            <button
              onClick={() => setDescriptionVisibility((prev) => !prev)}
              className='block mx-auto'
            >
              <img src={ArrowDownIcon} />
            </button>
          ) : (
            <>
              <p className='text-sm mt-2 pl-2'>{task.description}</p>
              <button
                onClick={() => setDescriptionVisibility((prev) => !prev)}
                className='block mx-auto'
              >
                <img src={ArrowUpIcon} />
              </button>
            </>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default TaskDetails
