import { useState, SyntheticEvent, useRef, useEffect } from 'react'
import { useProjectStore } from '../store/projectStore'
import { getUniqueId } from '../../shared/utils'
import { motion } from 'framer-motion'
import { X } from 'react-feather'
import useAutosizeTextArea from '../hooks/useAutoSizeTextArea'
import useClickOutside from '../hooks/useClickOutside'

const NewTaskForm = ({ sectionId }: { sectionId: string }) => {
  const [isOpen, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const addTask = useProjectStore((state) => state.addTask)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useAutosizeTextArea(titleRef.current, title)
  useAutosizeTextArea(descriptionRef.current, description)

  useClickOutside(() => setOpen(false), formRef)

  const handleNewTask = (event: SyntheticEvent) => {
    event.preventDefault()
    const task = {
      id: getUniqueId(),
      title,
      description,
      completed: false,
      inProgress: false,
    }
    addTask(task, sectionId)
    setTitle('')
    setDescription('')
    setOpen(false)
  }

  return (
    <div className='p-2 w-fit mx-auto overflow-hidden'>
      {!isOpen ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => setOpen(true)}
          className='w-full h-full px-2 py-1 mx-auto bg-slate-800 border border-slate-700  rounded-md'
        >
          Add new Task
        </motion.button>
      ) : (
        <motion.form
          ref={formRef}
          onSubmit={handleNewTask}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='flex flex-col items-center justify-center gap-y-3'
        >
          <button onClick={() => setOpen(false)} className='block'>
            <X />
          </button>
          <textarea
            ref={titleRef}
            value={title}
            rows={1}
            placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
            className='w-full resize-none outline-none text-white bg-transparent border-b px-2 border-slate-700'
          />
          <textarea
            ref={descriptionRef}
            value={description}
            rows={1}
            placeholder='Description (optional)'
            onChange={({ target }) => setDescription(target.value)}
            className='w-full resize-none outline-none text-white bg-transparent border-b px-2 border-slate-700'
          />
          <button
            type='submit'
            className='block py-1 px-2 text-white bg-slate-800 border border-slate-700 rounded-md'
          >
            Add
          </button>
        </motion.form>
      )}
    </div>
  )
}

export default NewTaskForm
