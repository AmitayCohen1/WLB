import {useChallengesContext} from '../hooks/useChallengeContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vector from '../assets/vector.png'
import { useAuthContext } from '../hooks/useAuthContext';


const Child = ({challenge}) => {
    const { challengeDispatch } = useChallengesContext();
    const { user } = useAuthContext()

    // const navigate = useNavigate()
    const handleDelete = async (e) => { 
        e.preventDefault()
        if(user) { 
            const response = await fetch(`http://localhost:4000/api/challenges/${challenge._id}`,  { 
                method: 'DELETE',
                headers : { 
                    'Autharization': `Bearer ${user.token}`
                  },
            })
            const json = await response.json();
            if(!response.ok) { 
                console.log('Challenge was NOT deleted:', json)
            } 
            if(response.ok) { 
                console.log('Challenge was Deleted:', json)
                await challengeDispatch({type: 'DELETE_CHALLENGE', payload: json})
            }
        } 
    }
       

    const handleBadge = (e) => { 
        console.log('export badge');
    }

 
        return ( 
                <div className="flex-col ">
                    <div className='py-3'>
    
                        <h1 className='font-light text-sm text-red pt-9'>Reps: <span className='font-semibold'>{challenge.reps}</span></h1>
                        <h1 className='font-light text-sm text-createdByColor'>Created by <span className='font-bold'>{challenge.userName}</span></h1>
                        <h1 className='font-light text-sm text-createdByColor'><span className='font-bold'>{challenge.index}</span></h1>

                    </div>
                    <div className='pb-2 relative'>
                        <img className='rounded-2xl ' src={challenge.fileURL} alt='' />
                        <img onClick={handleBadge} className='absolute bottom-4 right-2 h-12 bg-red bg-opacity-10 border border-red rounded-full' src={vector} alt='score'/>
                    </div>
                    {/* <span onClick={handleDelete} className="material-symbols-outlined">delete</span> */}

                </div>
        )    
    }
    
export default Child;





