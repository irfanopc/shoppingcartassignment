import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./home.css";
//import axios from "axios";

const ProductRow = ({
  product,
  index,
  cart,
  setCart,
  count,
  onCountChange,
}) => {
  const navigator = useNavigate();

  const onDelete = (id) => {
    let isExecuted = window.confirm("Are you sure to delete this item?");
    if (isExecuted) {
      const newCart = cart.filter((item) => {
        return item._id !== id;
      });
      setCart(newCart);
    }
  };

  const onEdit = (id) => {
    let isExecuted = window.confirm("Are you sure to edit this item?");
    if (isExecuted) {
      const newName = prompt("Edit name");
      const newPrice = prompt("edit price");
      cart.map((item) => {
        if (item._id === id) {
          item.name = newName;
          item.price = newPrice;
        }
        return item;
      });
      setCart([...cart]);
    }
  };

  // console.log(totalPrice);
  useEffect(() => {
    window.localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button onClick={() => onCountChange(count + 1)}>+</button>

        {count}
        <button onClick={() => onCountChange(count - 1)}>-</button>
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
        <button
          onClick={() => {
            onEdit(product._id);
          }}
        >
          EDIT
        </button>
        <button
          onClick={() => {
            onDelete(product._id);
          }}
        >
          DEL
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
