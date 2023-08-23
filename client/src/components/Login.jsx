import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userFound,setUserFound]=useState(false);
  const navigate = useNavigate();
  const {setUser}=useContext(UserContext);
  async function  handlesubmit(e)
  {
    // axios.post('/login',{
    //   email,
    // })
    e.preventDefault();
    
       const status=await axios.post('/login',{email,password})
      setUser(status.data.email);
      //console.log(status)
   if(status.data.message==="found")
   {
    alert("logged in successful")
    setUserFound(true);
    //navigate('/');
   }
     if(status.data.message==="user not found"){
      alert("no user found")
     }
    
    if(status.data.message==="incorrect password")
    {
      alert("incorrect password")
    }
  }
  if(userFound)
  {
    navigate('/');
  }
  return (
    
    <div className='w-full h-80 flex flex-col items-center justify-center gap-5'>
        <h1 className='text-2xl'>Login</h1>
        
        <form className='flex flex-col gap-4'>
            
            <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter your E-mail'></input>
           
            <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter your password'></input>
            <button onClick={handlesubmit} className='primary'>Apply</button>
        </form>
        <div>Dont have an account yet?
           <Link className='text-lg font-bold underline' to={'/register'}> Register now</Link>
        </div>
    </div>
  )
}

export default Login
