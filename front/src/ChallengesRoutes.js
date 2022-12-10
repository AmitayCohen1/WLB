import { Badge } from "@mui/material"
import { useEffect, useState} from "react"
import { Navigate, Route, Routes} from "react-router-dom"
import Canvas from "./components/Canvas"
import CreateChild from "./components/CreateChild"
import useGoogleAnalytics from "./hooks/googleAnalytics"
import { useAuthContext } from "./hooks/useAuthContext"
import ChallengePage from "./pages/ChallengePage"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import axios from "axios"
import CreateParent from "./components/CreateParent"
import { useChallengesContext } from "./hooks/useChallengeContext"

export default function ChallengesRoutes() {
  const {challenges, challengeDispatch} = useChallengesContext();

    const {user, userDispatch} = useAuthContext()
    const [userSigned, setUserSigned] = useState(false)
    

    useEffect(() => { 
      const checkForChllenges = async () => {
        try {
          const response = await axios.get("/api/challenges");
          challengeDispatch({type: "SET_CHALLENGES", payload: response.data});
          console.log(response.data)
        } catch (err) {
          console.log("response is not ok:", err.message);
        }
      }
      
    if (!challenges) { 
      checkForChllenges();
    }

    }, [challengeDispatch, challenges]);



    useGoogleAnalytics()


    useEffect(() => { 
      const checkUserAuth = async () => { 
        if(user) { 
          const response = await axios.get("/api/auth", {
            headers: {
              Authorization: `Bearer ${user.token}`
            },
          });
          if(response.statusText === 'OK') { 
            setUserSigned(true);
          } else { 
            setUserSigned(false);
          }
        }  
    } 
    checkUserAuth()
  }, [user])


    return (
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/:challengeParamsId" element={ <ChallengePage />} />
        <Route path="/login" element={ !userSigned ? <Login /> : <Navigate to='/'/>} />
        <Route path="/signup" element={ !userSigned ? <Signup /> : <Navigate to='/'/>} />
        <Route path="/create" element={ userSigned ? <CreateParent /> : <Login /> } />
        <Route path="/reply/:id" element={ userSigned ? <CreateChild /> : <Login />} />
        <Route path="/badge" element={ <Badge />} />
        <Route path="/canvas" element={ <Canvas />} />
      </Routes>
    )
  }






