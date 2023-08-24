import React, { useEffect, useState } from 'react'
import axios from 'axios';

const MyBookings = () => {
const [places,setPlaces]=useState([]);
    useEffect(() => {

        //console.log(_id);
        axios.post('/my-booking').then((data)=>{
            console.log(data.data[0].checkinTime);
            setPlaces(data.data);
            
        });
    },[])
    console.log(places)
  return (
    <div>
        {
        places.map((place, index) => (
          
          <div className='z-1+ flex flex-col items-center gap-2 border-2 border-red-500 font-bold'>
            <h1 >Owner: {place.owner}</h1>
            <h1 >checkinTime: {place.checkinTime}</h1>
            <h1 >checkoutTime: {place.checkoutTime}</h1>
            <h1 >checkingDate: {place.checkingDate}</h1>
            <h1 >checkoutDate: {place.checkoutDate}</h1>
            <h1 >ID: {place._id}</h1>
            {/* <h1 >Address: {place.address}</h1>
            <h1 >Description: {place.description}</h1>
            <h1>Booking: {place.booked === false ? 'Available' : 'Not Available'}</h1>
            <img className='w-[100px] h-[100px]' src={`http://localhost:4000/${place.photos}`} /> */}
            
          </div>
        ))
}
    </div>
  )
}

export default MyBookings