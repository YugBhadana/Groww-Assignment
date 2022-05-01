import { useRef, useEffect, useState } from 'react'

export function useDebounce(search, debounceTime) {
  const [ debouncedSearch, setDebouncedSearch ] = useState(search)
  const setTimeoutRef = useRef(null)

  useEffect(() => {
    if(setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current)
    }

    setTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search)
    }, debounceTime)
  }, [ search, debounceTime ])

  return debouncedSearch
}