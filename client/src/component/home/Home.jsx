import React from "react";
import Header from "../header/Header";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductRow from "./procuctRow";
import jsPDF from "jspdf";
import History from "../history/History";
function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [counts, setCounts] = useState({});
  const total = cart.reduce(
    (acc, product) =>
      acc + (product.price * counts[product._id] || product.price),
    0
  );
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

  const generatePDF = async () => {
    const pdf = new jsPDF();
    pdf.text(10, 20, `invoice:`);
    cart.forEach((item, index) => {
      pdf.text(
        20,
        30 + index * 10,
        `${index + 1}. ${item.name} - Price: ${item.price} - Quantity: ${
          counts[item._id] || 1
        } total: ${counts[item._id] * item.price || 1}`
      );
    });
    pdf.text(20, 30 + cart.length * 10, `Total: ${total}`);
    pdf.save(`bill.pdf`);
    const username = window.localStorage.getItem("username");
    const data = {
      username: username,
      pdf: pdf.output("datauristring"),
    };

    try {
      await axios.post("https://shoppingcart-7a48.onrender.com/purchase", data);
      console.log("PDF sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // to get pdf
  const [pdfData, setPdfData] = useState([]);
  // console.log(pdfData);
  const id = window.localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://shoppingcart-7a48.onrender.com/history/${id}`)
      .then((data) => {
        // console.log(data);
        let user = data.data.purchasehistory;
        const property = user.map((obj) => {
          return {
            property: obj.properties.map((prop) => prop),
          };
        });

        property.map((data) => {
          let user = data.property;
          return setPdfData(user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [generatePDF]);

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
                  count={counts[product._id] || 1} //to get value of perticular key
                  onCountChange={(count) =>
                    handleCountChange(product._id, count)
                  }
                />
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td align="center" colSpan="4">
                Total Price
              </td>
              <td align="center" className="total">
                {total}
              </td>
              <td>
                {" "}
                <button id="pdf" onClick={generatePDF}>
                  download pdf as pdf
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="history">
          {pdfData.map((pdf, i) => (
            <History pdf={pdf} number={i} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
