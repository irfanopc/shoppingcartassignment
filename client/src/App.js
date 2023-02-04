
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import Viewdetails from "./component/viewdetail/Viewdetails";
import History from "./component/history/History";

function App() {
  

  return (
  
    <div className="App">
      <BrowserRouter>
        {<Link to={"/"}></Link>}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/viewdetails" element={<Viewdetails />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
