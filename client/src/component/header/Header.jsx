import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = ({ data, onChangeItem }) => {
  const navigator = useNavigate();
  let username = window.localStorage.getItem("username");
  let setUsername = username.slice(0);
  const handleLogout = () => {
    const isExecuted = window.confirm("Do you want to logout");
    if (isExecuted) {
      axios
        .get("https://shoppingcart-7a48.onrender.com/logout")
        .then((data) => {
          alert(data.data.message);
          localStorage.removeItem("Cart");
          localStorage.removeItem("username");
          localStorage.removeItem("id");
          window.history.pushState({}, null, "/");
          navigator("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="header">
      <div className="left">L O G O</div>

      <div className="center">
        <section className="products">
          <select id="select" defaultValue="" onChange={onChangeItem}>
            <option value="">Choose a product ...</option>
            {data &&
              data.map((item_name, i) => {
                return (
                  <option key={i} value={item_name.name}>
                    {item_name.name}
                  </option>
                );
              })}
          </select>
        </section>
      </div>

      <div className="right">
        <section className="user">
          <select value={setUsername} onChange={handleLogout}>
            <option value={setUsername}>{setUsername}</option>
            <option value="logout">log out</option>
          </select>
        </section>
      </div>
    </div>
  );
};

export default Header;
