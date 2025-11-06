import { useState, useEffect } from 'react'

/**
 * Hook personnalisé pour la persistance dans localStorage
 * Custom hook for localStorage persistence
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Lire la valeur initiale depuis localStorage / Read initial value from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Fonction pour mettre à jour la valeur / Function to update value
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permettre la fonction callback comme React.useState / Allow callback function like React.useState
      const valueToStore = typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
