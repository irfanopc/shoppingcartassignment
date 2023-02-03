import React from "react";
import Header from "../header/Header";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductRow from "./procuctRow";
function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [counts,setCounts] = useState({})
  const total = cart.reduce((acc, product) => acc + (product.price *( counts[product._id]) || product.price), 0);
  //console.log(cart);
  useEffect(() => {
    axios
      .get("https://shoppingcart-7a48.onrender.com/product")
      .then((data) => {
        setData(data.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChangeItem = (e) => {
    const product = data.filter((item) => {
      return item.name === e.target.value;
    });
    setCart([...cart, ...product]);
  };

  useEffect(() => {
    const savedCart = JSON.parse(window.localStorage.getItem("Cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);
  const handleCountChange = (productId, count) => {
    setCounts({
      ...counts,
      [productId]: count, 
    });                        
  };
  return (
    <div className="home">
      <Header cart={cart} data={data} onChangeItem={onChangeItem} />

      <div className="banner">
        <img
          src="https://m.media-amazon.com/images/I/61+GduPIncL._SX3000_.jpg"
          alt="banner"
        />
      </div>
      <section className="table">
        <table>
          <tbody>
            <tr>
              <th>slno.</th>
              <th>product name</th>
              <th>price/qty</th>
              <th>quantity</th>
              <th>total</th>
              <th>item-details</th>
            </tr>
            {cart.length > 0 &&
              cart.map((product, i) => (
                <ProductRow
                  key={i}
                  product={product}
                  index={i}
                  data={data}
                  cart={cart}
                  setCart={setCart}
                   count ={counts[product._id]  || 1} //to get value of perticular key
            onCountChange={count => handleCountChange(product._id, count)}
                />
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td  align="center" colSpan="4">
                Total Price
              </td>
              <td align="center" className="total">
                {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default Home;
