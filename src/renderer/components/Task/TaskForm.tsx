import {
  useState,
  SyntheticEvent,
  useRef,
  KeyboardEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react'
import { useProjectStore } from '../../store/projectStore'
import { getUniqueId } from '../../../shared/utils'
import { motion } from 'framer-motion'
import { X } from 'react-feather'
import useAutosizeTextArea from '../../hooks/useAutoSizeTextArea'
import useClickOutside from '../../hooks/useClickOutside'
import { Task } from '../../../shared/types'
import { Errors, validateInput, ValidationRules } from '../../utils/validation'

interface Props {
  sectionId: string
  currentTask?: Task
  setEditMode?: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ sectionId, currentTask, setEditMode }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [trySubmit, setSubmitTry] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title)
      setDescription(currentTask.description)
      setOpen(true)
    }
  }, [currentTask])

  const addTask = useProjectStore((state) => state.addTask)
  const editTask = useProjectStore((state) => state.editTask)

  const titleRef = useRef<HTMLTextAreaElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useAutosizeTextArea(titleRef, title)
  useAutosizeTextArea(descriptionRef, description)

  const handleFormClose = () => {
    if (setEditMode) {
      setEditMode(false)
    } else {
      setOpen(false)
    }
  }

  useClickOutside(handleFormClose, formRef)

  const validationRules: ValidationRules = {
    title: {
      required: true,
      minLength: 3,
    },
  }

  const handleInputChange = (
    name: string,
    value: string,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    const error = validateInput(value, validationRules[name])

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    } else if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }

    setState(value)
  }

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const titleError = validateInput(title, validationRules.title)
    if (titleError) {
      setErrors((prev) => ({ ...prev, title: titleError }))
      return
    }

    if (currentTask) {
      const task: Task = {
        ...currentTask,
        title,
        description,
      }
      editTask(sectionId, task)
      setEditMode(false)
    } else {
      const task: Task = {
        id: getUniqueId(),
        title,
        description,
        completed: false,
        inProgress: false,
      }
      addTask(task, sectionId)
      setOpen(false)
    }

    setTitle('')
    setDescription('')
    setSubmitTry(false)
  }

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      formRef.current.requestSubmit()
    }
  }

  return (
    <div className='w-full font-manrope'>
      {!isOpen ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => setOpen(true)}
          className='block mx-auto p-2 mt-4 mb-2 bg-slate-800 rounded-md border border-slate-600'
        >
          Add new Task
        </motion.button>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className='flex flex-col items-center justify-center gap-y-3 p-2 bg-slate-800 rounded-md'
        >
          <div className='flex relative items-center pb-2 w-full border-b border-slate-700 min-h-20 grow-0 overflow-hidden'>
            <textarea
              ref={titleRef}
              value={title}
              rows={1}
              placeholder='Title'
              onChange={({ target }) =>
                handleInputChange('title', target.value, setTitle)
              }
              onKeyDown={onEnterPress}
              className='pl-2 font-bold w-4/5 resize-none outline-none text-white bg-transparent'
            />
            <button
              onClick={handleFormClose}
              className='w-1/5 aspect-square rounded-md hover:bg-black/20'
            >
              <X className='mx-auto' />
            </button>

            <p className='absolute bottom-1 text-sm text-red-500 pl-2'>
              {errors.title}
            </p>
          </div>
          <textarea
            ref={descriptionRef}
            value={description}
            rows={1}
            placeholder='Description (optional)'
            onChange={({ target }) => setDescription(target.value)}
            onKeyDown={onEnterPress}
            className='w-full resize-none outline-none text-sm text-white bg-transparent pl-2'
          />
          <button
            type='submit'
            className='block py-1 px-2 mt-2 text-white bg-blue-600 border border-slate-700 rounded-md'
          >
            Save
          </button>
        </form>
      )}
    </div>
  )
}

export default TaskForm
