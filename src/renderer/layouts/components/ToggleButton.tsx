import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  className?: string
}

const ToggleButton = ({ isOpen, setOpen, className = '' }: Props) => {
  return (
    <button
      className={`flex justify-center items-center text-white text-center w-14 h-14 ${className}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <svg width='23' height='23' viewBox='0 0 23 19' className=''>
        <motion.path
          strokeWidth='3'
          stroke='white'
          strokeLinecap='square'
          d='M 2 2.5 L 21 2.5'
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 2.5 L 21 2.5' },
            open: { d: 'M 3 17.5 L 20 1.5' },
          }}
        />
        <motion.path
          strokeWidth='3'
          stroke='white'
          strokeLinecap='square'
          d='M 2 9.423 L 21 9.423'
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        />
        <motion.path
          strokeWidth='3'
          stroke='white'
          strokeLinecap='square'
          d='M 2 16.346 L 21 16.346'
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 16.346 L 21 16.346' },
            open: { d: 'M 3 1.5 L 20 17.5' },
          }}
        />
      </svg>
    </button>
  )
}

export default ToggleButton
