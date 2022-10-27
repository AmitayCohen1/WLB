import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';


export const useChallengesContext = () => { 
    const context = useContext(ChallengeContext);
    if(!context){ 
        throw Error('cant use useChallengesContext outside of scope')
    }
    return context
}


