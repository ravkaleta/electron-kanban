// import React, { KeyboardEvent, useRef, useState } from 'react'

// interface Props {
//   value: string

//   handleEnterPress?: () => void
//   className?: string
// }

// const TextArea = ({ handleEnterPress, className = '' }: Props) => {
//   const ref = useRef(null)
//   const [value, setValue] = useState('')

//   const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && e.shiftKey === false) handleEnterPress()
//   }

//   return (
//     <textarea
//       ref={ref}
//       value={value}
//       rows={1}
//       placeholder='Description (optional)'
//       onChange={({ target }) => setValue(target.value)}
//       onKeyDown={onEnterPress}
//       className={`w-full resize-none outline-none text-sm text-white bg-transparent pl-2 ${className}`}
//     />
//   )
// }

// export default TextArea
