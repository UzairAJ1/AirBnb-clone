import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
const index = () => {
  const [places, setPlaces] = useState([]);
  const [booking, setBookings] = useState(false);
  console.log(places)
  useEffect(() => {
    axios.get('/start').then(({ data }) => {
     
      setPlaces(data);


    });
  }, [])
  const handleSubmit = () => {

  }
  return (
    <div className='grid grid-cols-3 gap-2 justify-center'>
      {booking === false &&
        places.map((place, index) => (
          
          <div className='z-1 flex flex-col gap-2 items-center my-4'>
            <img className='w-[300px] h-[250px] rounded-xl' src={`http://localhost:4000/${place.photos}`} />
            <h1 key={index} className='font-bold'>Title: {place.title}</h1>
            <h1 >Address: {place.address}</h1>
            <h1 >Description: {place.description}</h1>
            <h1 className='font-bold'>Booking: {place.booked === false ? 'Available' : 'Not Available'}</h1>
            
            <Link
              to={{ pathname: `/book/${place._id}` }}
              className='text-white text-center   w-32 bg-red-500 rounded-xl mx-auto'
            >
              Visit
            </Link>
          </div>
        ))
      }
      {booking &&
        <div className='z-10'>
            <h1>Book you spot</h1>
            <button onClick={() => { setBookings(false) }} className='text-white   w-32 bg-red-500 rounded-xl'>Cancel</button>
        </div>
      }
    </div>
  )
}

export default index