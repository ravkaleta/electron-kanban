import { RefObject, useEffect } from 'react'

const useClickOutside = (
  onClick: (event: MouseEvent) => void,
  ref: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Sprawdza, czy kliknięcie było na zewnątrz elementu
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      onClick(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  })
}

export default useClickOutside
