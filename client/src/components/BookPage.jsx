import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const BookPage = () => {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [clickBook, setClickBook] = useState(false);
  const [checkingDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [checkinTime, setCheckinTime] = useState();
  const [checkoutTime, setCheckoutTime] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isFormValid = checkingDate && checkoutDate && checkinTime && checkoutTime;
  //console.log(checkinTime,checkoutTime,checkingDate,checkoutDate)
  //console.log(isFormValid);
  useEffect(() => {

    //console.log(_id);
    axios.post('/find', { _id: id }).then(({ data }) => {
      //setUser(data.email);
      //console.log(data.message);
      if (data.message === 'user not found') {
        setUser(false);
      }
      if (data.message !== 'user not found') {
        setUser(true);
      }
      setPlaces(data.data)


    });

  }, [id])

  const handleBook = () => {
    if (user === false) {
      alert("login first");
    }
    else
      setClickBook(true);
  }
  //console.log(clickBook);

  const submitBook = () => {
    if (!isFormValid) {
      alert('Please fill in all fields');

    }
    else {


      axios.post('/book', { _id: id, checkingDate, checkoutDate, checkinTime, checkoutTime }).then(({ data }) => {
        //console.log(data.message);
        //setMessage(data.message);
        if (data.message === "Already booked") {
          alert("This Place is Already booked by Someone")
        }
        if (data.message === "saved") {
          alert("Booked");
        }
      });
    }
  }

  return (
    <div className='flex items-center justify-center relative'>
      {/* <h1>Book Page:{id}</h1> */}
      {places &&


        <div className='z-1 w-3/4 h-1/4  gap-2 my-2  font-bold  flex flex-col items-center'>
          <h1 className='font-bold'>Title: {places.title}</h1>

          <img
            className='w-[500px] h-[400px] border-4 border-black'
            src={`http://localhost:4000/${places.photos}`}
            alt='Place'
          />
          <h1>Address: {places.address}</h1>
          <h1>Description: {places.description}</h1>
          <h1>Owner: {places.owner}</h1>
          <div className='flex flex-col items-center'>
            <h1>What this place offers</h1>
            <div className='flex gap-4'>
              <h1>Free Wifi</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <div className='flex gap-4' >
              <h1>Free Parking</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <div className='flex gap-4'>
              <h1>Television</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>
            <div className='flex gap-4'>
              <h1>Charging</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>

            </div>
          </div>
          <button onClick={handleBook} className='text-white   w-32 bg-red-500 rounded-xl mt-3'>Click to Book</button>
        </div>

      }

      {clickBook &&
        <div className='w-2/4 h-full border-4 border-red-500 z-10 absolute bg-[#FD6065] flex flex-col gap-3'>
          <div className='w-full'>
            <div onClick={() => { setClickBook(!clickBook) }} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

            </div>
            {/* <button  className='text-white   w-32 bg-red-500 rounded-xl'>Cancel</button> */}
          </div>
          <label htmlFor='checkin-date' className='text-white'>
            Check-in Date:
          </label>
          <input
            type='date'
            id='checkin-date'
            className='px-2 py-1 rounded-md border border-gray-300'
            onChange={(e) => { setCheckinDate(e.target.value) }}
          />
          <label htmlFor='checkout-date' className='text-white'>
            Check-out Date:
          </label>
          <input
            type='date'
            id='checkout-date'
            className='px-2 py-1 rounded-md border border-gray-300'
            onChange={(e) => { setCheckoutDate(e.target.value) }}
          />
          <label htmlFor='checkin-time' className='text-white'>
            Check-in Time:
          </label>
          <input
            type='time'
            id='checkin-time'
            className='px-2 py-1 rounded-md border border-gray-300'
            onChange={(e) => { setCheckinTime(e.target.value) }}
          />
          <label htmlFor='checkout-time' className='text-white'>
            Check-out Time:
          </label>
          <input
            type='time'
            id='checkout-time'
            className='px-2 py-1 rounded-md border border-gray-300'
            onChange={(e) => { setCheckoutTime(e.target.value) }}
          />
          <button onClick={submitBook} className='text-white w-32 bg-green-500 rounded-xl mx-auto'>
            Book Now
          </button>
        </div>
      }
    </div>
  );
};

export default BookPage;
