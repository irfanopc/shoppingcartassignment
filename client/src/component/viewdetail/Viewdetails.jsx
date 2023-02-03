import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../header/Header';
import './viewdetails.css'

const DetailsPage = () => {
 const navigator = useNavigate()
  const location = useLocation()
  const product = location.state;

  

  return  (
    <>

    <Header/>
<div className='viewdetails'>

<section className='img'>
<h1>{product.name}</h1>
  <img src={product.img} alt={product.name} />
</section>



<section className="details">

<section className='btn'>
<button>Add to Cart</button>
  <button>Buy</button>
</section>

 
  <ul>
    <li><strong>size</strong> : <em> 6GB RAM, 128GB Storage</em> </li>
    <li><strong>Colour</strong> : Blue Tide</li>
    <li><strong>Brand</strong> :	{product.name}</li>
    <li><strong> Model Name</strong> :	{product.name} Nord CE 2 Lite 5G</li>
  </ul>
</section>
</div>
    </>
       
      )
    }


export default DetailsPage