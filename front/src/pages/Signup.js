
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"


// LOGIIN
const Signup = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(userName, email, password)
  }


  return (
    <div className=" bg-black h-screen grid place-content-center">
    <form  className="p-6 rounded-xl bg-stone-900 w-fit" onSubmit={handleSubmit}>
      <h3 className="font-bold text-2xl text-center pb-4 text-white">Sign up</h3>
      <h6 className="font-light text-xl text-center pb-12 text-white">Sign up and challenge the world or <Link to="/login"><span className="text-red underline">Login</span></Link></h6>

      <div className="grid place-items-center p-4">

      <input 
        type="text" 
        placeholder="Full Name"
        className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
        onChange={(e) => setUserName(e.target.value)} 
        value={userName} 
      />


      <input 
        type="email" 
        placeholder="Email"
        className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      

      <input 
        type="password" 
        placeholder="Password"
        className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />


      <button  className="bg-red py-3 rounded px-28 hover:bg-red  text-stone-900 font-semibold  hover:text-stone-200" disabled={isLoading}>Sign up</button>
      {error && <div className="text-stone-300 pt-4">{error}</div>}
      </div>
    </form>
    </div>
  )
}

export default Signup

