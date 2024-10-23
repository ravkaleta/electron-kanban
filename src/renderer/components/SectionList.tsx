import React from 'react'
import Section from './Section'
import { useProjectStore } from '../store/projectStore'

interface Props {
  sectionsInOrder: string[]
}

const SectionList = ({ sectionsInOrder }: Props) => {
  const addSection = useProjectStore((state) => state.addSection)

  const handleNewSection = () => {
    addSection()
  }

  return (
    <div className='w-full h-full overflow-x-scroll'>
      <div className='flex'>
        {sectionsInOrder.map((sectionId) => (
          <Section sectionId={sectionId} key={sectionId} />
        ))}
        <button
          onClick={handleNewSection}
          className='ml-8 w-24 shrink-0 h-24 bg-slate-950 text-white text-3xl border border-slate-800 rounded-xl shadow-black shadow-sm'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default SectionList
