import { useEffect } from 'react'

export function useStorage (key, value) {
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value])

  return JSON.parse(localStorage.getItem(key))
}
