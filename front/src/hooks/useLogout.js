import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom";


export const useLogout = () => { 
    const { userDispatch } = useAuthContext()
    const navigate = useNavigate();

    const logout =  async () => { 
        await localStorage.removeItem('user')
        await userDispatch({type: 'LOGOUT'})
        navigate('/')
  }   
    return {logout}
}