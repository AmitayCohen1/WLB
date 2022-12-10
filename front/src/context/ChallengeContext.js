import { createContext, useReducer } from "react";

export const ChallengeContext = createContext();

export const challengeReducer = (state, action) => { 
    switch(action.type) { 
        case 'SET_CHALLENGES': 
        return { 
            challenges: action.payload
        }
        case 'CREATE_CHALLENGE': 
        return { 
            challenges: [action.payload, ...state.challenges]
        }

        case 'REPLY': 

        return { 
            challenges: state.challenges
        }
            case 'DELETE_CHALLENGE': 
            return{
                 challenges: state.challenges.filter(challenge => challenge._id !== action.payload._id)
                }
        default: 
        return state 
    }
}


export const ChallengeContextProvider = ({children}) => { 
    const [state, challengeDispatch] = useReducer(challengeReducer, {
        challenges: null
    })
    
    return ( 
        <ChallengeContext.Provider value={{...state, challengeDispatch}}> 
        {children}
        </ChallengeContext.Provider>
    )
}
 








