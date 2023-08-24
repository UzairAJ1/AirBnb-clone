import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from 'axios'
import PlacesPage from './PlacesPage';
import MyBookings from './MyBookings';
const Account = () => {
    const [page, setPage] = useState(null);

    function handlesubmit(e) {
        setPage(e)
        // console.log(e);
    }

    async function logout() {
        await axios.post('/logout');
        window.location.reload();
    }
    const { user } = useContext(UserContext);
    return (
        <>
            <div className='flex justify-center gap-12 my-12'>

                <button onClick={() => handlesubmit("profile")} className={`${page === "profile" ? 'text-white   w-52 bg-red-500 rounded-xl flex  px-4 font-bold gap-4' : 'text-black w-52 flex px-4 font-bold gap-4'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <h1>My Profile</h1>
                </button>
                <button onClick={() => handlesubmit("booking")} className={`${page === "booking" ? 'text-white   w-52 bg-red-500 rounded-xl flex  px-4 font-bold gap-4' : 'text-black w-52 flex px-4 font-bold gap-4'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <h1>My Bookings</h1>
                </button>
                <button onClick={() => handlesubmit("accomodations")} className={`${page === "accomodations" ? 'text-white   w-52 bg-red-500 rounded-xl flex  px-4 font-bold gap-4' : 'text-black w-52 flex px-4 font-bold gap-4'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>


                    <h1>Accomodations</h1>
                </button>

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
                    <MyBookings />

                }

                {page === 'accomodations' &&
                    <PlacesPage />

                }
            </div>
        </>
    )
}

export default Account