import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function Viewdetails() {
    const location = useLocation();
    const details = location.state;
  return (
    <div>
        <img src={details.image} alt="image" />
        <h1>{details.name}</h1>
        <h1>{details.price}</h1>
    
    </div>
  )
}

export default Viewdetails