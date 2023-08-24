import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Accomodations from './Accomodations';
const PlacesPage = () => {
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const isFormValid = title !== '' && address !== '' && description !== '' && selectedPhoto !== null;
  //console.log(imageUploaded)
  function handlesubmit(e) {
    setSelected(e)
    // console.log(e);
  }

  async function handlePhoto() {

    const data = new FormData();
    data.append('photos', selectedPhoto);
    const response = await axios.post('/upload', data, { 'Content-Type': 'multipart/form-data' });
    setImageUploaded(response.data.photos);
  }
  async function saveAccomodation(e) {
    e.preventDefault();

    if (!isFormValid) {
      alert('Please fill in all fields and select a photo.');
      return;
    }

    const data = new FormData();
    data.append('photos', selectedPhoto);
    data.append('title', title);
    data.append('address', address);
    data.append('description', description);
    try {
      const response = await axios.post('/save', data, { 'Content-Type': 'multipart/form-data' },

      );
      //console.log(data.get('title'));
      if (response.data.message === 'saved') {
        alert("Saved")
      }
    } catch (error) {

      alert('Error registering place');
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className='flex my-4'>
        <button onClick={() => handlesubmit("accomodation")} className={`${selected === "accomodation" ? 'text-white   w-58 bg-red-500 rounded-xl flex   px-4 font-bold gap-4' : 'text-black w-58 flex px-4 font-bold gap-4'} `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>



          <h1>My Accomodations</h1>
        </button>
        <button onClick={() => handlesubmit("place")} className={`${selected === "place" ? 'text-white   w-58 bg-red-500 rounded-xl flex   px-4 font-bold gap-4' : 'text-black w-58 flex px-4 font-bold gap-4'} `}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>




          <h1>Add Accomodations</h1>
        </button>

      </div>
      {selected === 'accomodation' &&
        <Accomodations />
      }

      {selected === 'place' &&
        <form onSubmit={saveAccomodation} className='flex flex-col mt-6 gap-2' >
          <h1>Enter Details</h1>
          <input type='text' placeholder='Enter Title' onChange={(e) => { setTitle(e.target.value) }} />
          <input type='text' placeholder='Enter Address' onChange={(e) => { setAddress(e.target.value) }} />
          <input type='text' placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} />
          <input type='file' placeholder='Upload images' onChange={(e) => { setSelectedPhoto(e.target.files[0]) }} />
          {/* <button onClick={handlePhoto} className='bg-red-500'>Submit Photo</button> */}
          <button type='submit' className='text-white  w-52 bg-red-500 rounded-xl mx-auto'>Save</button>
        </form>

      }
      {imageUploaded &&
        <img src={`http://localhost:4000/${imageUploaded}`} />
      }
    </div>
  )
}

export default PlacesPage