import { createContext, useState,useEffect } from "react";
import axios from 'axios'
export const UserContext=createContext({});

export function UserContextProvider({children})
{
    const [user,setUser]=useState();
    
    useEffect(() => {
        if (!user)
        {

       
       
          axios.get('/profile').then(({data}) => {
            setUser(data.email);
            //console.log(user);
          
          });
        }
        
      }, []);
    return(
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    );
}