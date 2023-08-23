import React, { useState, useEffect } from 'react'
import axios from 'axios';
const Accomodations = () => {


    const [places, setPlaces] = useState([]);
    //console.log(places);
    useEffect(() => {

        axios.get('/places').then(({ data }) => {
            //setUser(data.email);
            setPlaces(data);


        });


    }, []);
    return (
        <div>
           
            {
                places.map((place, index) => (
                    <h1 key={index}>{place.address}</h1>
                ))
            }
        </div>
    )
}

export default Accomodations