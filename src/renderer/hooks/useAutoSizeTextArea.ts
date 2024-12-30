import { RefObject, useEffect } from 'react'

const useAutosizeTextArea = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      requestAnimationFrame(() => {
        textArea.style.height = '0px'
        textArea.style.height = `${Math.min(textArea.scrollHeight, 80)}px`
      })
    }
  }, [textAreaRef, value])
}

export default useAutosizeTextArea
