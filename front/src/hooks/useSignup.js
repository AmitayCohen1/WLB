import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

import axios from "../config/axios";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { userDispatch } = useAuthContext()

  const signup = async (userName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/signup", JSON.stringify({ userName, email, password }), {
        headers: {"Content-Type": "application/json"},
      });

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // update the auth context
      userDispatch({type: "LOGIN", payload: response.data});
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
