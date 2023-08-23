import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Accomodations from './Accomodations';
const PlacesPage = () => {
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedPhoto,setSelectedPhoto]=useState(null);
  const [imageUploaded,setImageUploaded]=useState(null);
  //console.log(imageUploaded)
  function handlesubmit(e) {
    setSelected(e)
    // console.log(e);
  }

  async function handlePhoto()
  {
    
    const data=new FormData();
    data.append('photos',selectedPhoto);
   const response =await axios.post('/upload',data,{ 'Content-Type': 'multipart/form-data' });
   setImageUploaded(response.data.photos);
  }
  async function saveAccomodation(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/save', {
        title,
        address,
        description,
      });

      //console.log(response.data);
    } catch (error) {

      alert('Error registering place');
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div>
        <button onClick={() => handlesubmit("accomodation")} className={`${selected === "accomodation" ? 'text-white   w-52 bg-red-500 rounded-xl' : 'text-black w-52 '} `}>Accomodations</button>
        <button onClick={() => handlesubmit("place")} className={`${selected === "place" ? 'text-white   w-52 bg-red-500 rounded-xl' : 'text-black w-52 '} `}>Add new Place</button>
        
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
          <input type='file' placeholder='Upload images' onChange={(e)=>{setSelectedPhoto(e.target.files[0])}} />
          <button onClick={handlePhoto} className='bg-red-500'>Submit Photo</button>
          <button type='submit' className='text-white  w-52 bg-red-500 rounded-xl mx-auto'>Save</button>
        </form>
        
      }
      {imageUploaded &&
      <img src={`http://localhost:4000/${imageUploaded}`}/>
      }
    </div>
  )
}

export default PlacesPage