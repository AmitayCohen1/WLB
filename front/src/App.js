import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import CreateParent from './components/CreateParent'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer';
import CreateChild from './components/CreateChild';
import {useAuthContext} from './hooks/useAuthContext'
import { useEffect } from 'react';
import Badge from './components/Badge';
import Canvas from './components/Canvas';
import ChallengePage from './pages/ChallengePage';


const App = () => {
  const {user, userDispatch} = useAuthContext()

  //Check User
  useEffect(()=> { 
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) { 
      userDispatch({type: 'LOGIN', payload: user})
    } else { 
      localStorage.removeItem('user')
    }
  },[userDispatch])


  return (
    <div className='bg-black'>
      <BrowserRouter>
      <div className='bg-black min-h-screen w-screen object-center '>
        <Navbar />
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/:challengeParamsId" element={ <ChallengePage />} />
            <Route path="/login" element={ !user ? <Login /> : <Navigate to='/'/>} />
            <Route path="/signup" element={ !user ? <Signup /> : <Navigate to='/'/>} />
            <Route path="/create" element={ user ? <CreateParent /> : <Login /> } />
            <Route path="/reply/:id" element={ user? <CreateChild /> : <Login />} />
            <Route path="/badge" element={ <Badge />} />
            <Route path="/canvas" element={ <Canvas />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </div>


  );
  
}

export default App;









