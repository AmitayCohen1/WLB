import { useState} from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
   const res = await login(email, password)
   console.log('login response:', res)
   setPassword('')
   setEmail('')
  }

  return (

    
    <div className=" bg-black h-screen grid place-content-center pb-">
    
    <form className="p-16 rounded-xl bg-stone-900" onSubmit={handleSubmit}>
      <h3 className="font-bold text-4xl text-center pb-4 text-white">Log In</h3>
      <h6 className="font-light text-1xl text-center pb-12 text-white">Log in to your account or <Link to="/signup"><span className="text-red underline">Signup</span></Link></h6>

      <div className="grid place-items-center p-4">

          <input 
          placeholder="Email"
          className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
          type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />

          <input 
          placeholder="Password"
          className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
          type='password'
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />

      <button  className="bg-red py-3 rounded px-28 hover:bg-red  text-stone-900 font-semibold  hover:text-stone-200" disabled={isLoading}>Log in</button>
      {error ? <div className="text-stone-400 pt-4">{error}</div> : <div> </div>}
      </div>
    </form>
    </div>
  )
}

export default Login