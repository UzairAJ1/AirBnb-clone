import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("");
   async function registerUser(e)
  {
    e.preventDefault();
    
  //   const status=await axios.get('http://localhost:4000/test')
  //  console.log(status)

  try {
    const response = await axios.post('/register', {
      name,
      email,
      password,
    });
    
    console.log(response.data);
  } catch (error) {
  
    alert('Error registering user');
  }

     
  }
  return (
    <div className='w-full h-80 flex flex-col items-center justify-center gap-5'>
      
      <h1 className='text-2xl'>Register</h1>
      <form onSubmit={registerUser} className='flex flex-col gap-4'>
        <input
        
          onChange={(e) => {setName(e.target.value) }}
          type='name' placeholder='Enter your name'>

        </input>
        <input
          onChange={(e) => { setEmail(e.target.value) }}
          type='email'
          placeholder='Enter your E-mail'></input>
          <input
          onChange={(e) => { setMessage(e.target.value) }}
          type='text'
          placeholder='Enter your Message'></input>

        <input onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Enter your password'></input>
        <button type='submit' className='primary'>Apply</button>
      </form>
      <div>have an account?
        <Link className='text-lg font-bold underline' to={'/login'}>Login now</Link>
      </div>
    </div>
  )
}

export default Register