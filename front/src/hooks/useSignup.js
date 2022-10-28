import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { userDispatch } = useAuthContext()

  const signup = async (userName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userName, email, password })
    })
    const json = await response.json() 


    if (!response.ok) { 
      setIsLoading(false)
      setError(json.err)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      userDispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}