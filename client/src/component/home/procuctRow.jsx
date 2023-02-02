import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//import axios from "axios";

const ProductRow = ({ product, index,cart,setCart,totalPrice,setTotalPrice,ans }) => {



  const navigator = useNavigate();
  const [count, setCount] = useState(1);

  const onDelete=(id)=>{
   alert('are u going to delete')
   const newCart = cart.filter((item)=>{
         return item._id !==id
    })
    setCart(newCart)
  }

  const onEdit=(id)=>{
    const newName =prompt("Edit name");
    const newPrice = prompt('edit price')
     cart.map((item)=>{
      if(item._id === id){
        item.name = newName
        item.price = newPrice
        }
        return item;
    })
    setCart([...cart])
  }
  let price = product.price
  useEffect(()=>{
    { setTotalPrice([...totalPrice,price])}
    
   },[count])
   console.log(totalPrice);
  return (
 
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          onClick={() => {
            if (count > 1) setCount((c) => c - 1);
          }}
        >
          -
        </button>
        {count}
        <button
          onClick={() => {
            setCount((c) => c + 1);
          
          }}
        >
          +
        </button>
      </td>

      <td className="price">{count * product.price}</td>
      <td>
        <button
          onClick={() => {
            navigator("/viewdetails", { state: product });
          }}
        >
          view details
        </button>
      </td>
      <td>
        <button onClick={()=>{onEdit(product._id)}}>EDIT</button>
        <button onClick={()=>{onDelete(product._id)}}>DEL</button>
      </td>
    </tr>
    
  );
};

export default ProductRow;
