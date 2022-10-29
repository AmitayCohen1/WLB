import { useChallengesContext } from '../hooks/useChallengeContext'
import vector from '../assets/vector.png'
import { useAuthContext } from '../hooks/useAuthContext';

import axios from "../config/axios";


const Child = ({ challenge }) => {
    const { challengeDispatch } = useChallengesContext();
    const { user } = useAuthContext();

    // const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault();

        if (user) {
            try {
                const response = await axios.delete(`api/challenges/${challenge._id}`, {
                    headers: {
                        "Autharization": `Bearer ${user.token}`, // TODO: "Authorization"
                    },
                });

                console.log("Challenge was Deleted:", response.data);
                await challengeDispatch({ type: "DELETE_CHALLENGE", payload: response.data });
            } catch (err) {
                console.log("Challenge was NOT deleted:", err.message);
            }
        }
    };


    const handleBadge = (e) => {
        console.log('export badge');
    };


    return (
        <div className="flex-col ">
            <div className='py-3'>

                <h1 className='font-light text-sm text-red pt-9'>Reps: <span className='font-semibold'>{challenge.reps}</span></h1>
                <h1 className='font-light text-sm text-createdByColor'>Created by <span className='font-bold'>{challenge.userName}</span></h1>
                <h1 className='font-light text-sm text-createdByColor'><span className='font-bold'>{challenge.index}</span></h1>

            </div>
            <div className='pb-2 relative'>
                <img className='rounded-2xl ' src={challenge.fileURL} alt='' />
                <img onClick={handleBadge} className='absolute bottom-4 right-2 h-12 bg-red bg-opacity-10 border border-red rounded-full' src={vector} alt='score' />
            </div>
            {/* <span onClick={handleDelete} className="material-symbols-outlined">delete</span> */}

        </div>
    )
}

export default Child;





