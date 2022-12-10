import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(()=> { 
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) { 
      userDispatch({type: 'LOGIN', payload: user})
    }
  },[])
  
  return (
    <AuthContext.Provider value={{ ...state, userDispatch }}>
      { children }
    </AuthContext.Provider>
  )

}