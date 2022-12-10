import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

import axios from "../config/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { userDispatch } = useAuthContext();

  const login = async (email, password) => {

    console.log('s')
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/login", JSON.stringify({ email, password }), {
        headers: {"Content-Type": "application/json"},
      });

      localStorage.setItem("user", JSON.stringify(response.data))
      console.log(response.data)
      // update the auth context
      userDispatch({type: "LOGIN", payload: response.data})
    } catch (err) {
      setError(err.response.data.err);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
