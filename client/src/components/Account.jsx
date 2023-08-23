import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from 'axios'
import PlacesPage from './PlacesPage';
const Account = () => {
    const [page, setPage] = useState(null);
   
    function handlesubmit(e) {
        setPage(e)
       // console.log(e);
    }

    async function logout()
    {
        await axios.post('/logout');
        window.location.reload();
    }
    const {user}=useContext(UserContext);
    return (
        <>
            <div className='flex justify-center gap-12 my-12'>

                <button onClick={() => handlesubmit("profile")} className={`${page === "profile" ? 'text-white   w-52 bg-red-500 rounded-xl' : 'text-black w-52 '} `}>My Profile</button>
                <button onClick={() => handlesubmit("booking")} className={`${page === "booking" ? 'text-white  w-52 bg-red-500 rounded-xl' : 'text-black w-52 '} `}>My Bookings</button>
                <button onClick={() => handlesubmit("accomodations")} className={`${page === "accomodations" ? 'text-white   w-52 bg-red-500 rounded-xl' : 'text-black w-52'} `}>My Accomodations</button>

            </div>
            <div className='flex justify-center'>
            {page === 'profile' &&
            <div className='flex flex-col items-center gap-4 my-3'>
                <div>profile</div>
                <h1 className='text-black font-bold'>Logged in as: {user}</h1>
                <button onClick={logout} className='text-white   w-52 bg-red-500 rounded-xl'>Log out</button>
                </div>

            }

            {page === 'booking' &&
                <div>booking</div>

            }

            {page === 'accomodations' &&
                <PlacesPage />

            }
            </div>
        </>
    )
}

export default Account