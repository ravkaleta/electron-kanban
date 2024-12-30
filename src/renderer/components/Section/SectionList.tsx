import React from 'react'
import Section from './Section'
import { useProjectStore } from '../../store/projectStore'

interface Props {
  sectionsInOrder: string[]
}

const SectionList = ({ sectionsInOrder }: Props) => {
  const addSection = useProjectStore((state) => state.addSection)

  const handleNewSection = () => {
    addSection()
  }

  return (
    <div className='flex w-full h-full pr-4 overflow-x-scroll'>
      {sectionsInOrder.map((sectionId) => (
        <Section sectionId={sectionId} key={sectionId} />
      ))}
      <button
        onClick={handleNewSection}
        className='ml-4 w-24 shrink-0 h-24 bg-slate-950 text-white text-3xl border border-slate-800 rounded-xl shadow-black shadow-sm'
      >
        +
      </button>
    </div>
  )
}

export default SectionList
