import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css'
const Header = ({data,onChangeItem}) => {
  const navigator = useNavigate()
  let username = window.localStorage.getItem('username');
  let setUsername = username.slice(0)
  const handleLogout =  () => {
    axios.get('http://localhost:5000/logout')
      .then((data) => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        alert(data.data.message);
        navigator("/");
        
        
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

    return (
      <div className='header'>
  
        <div className="left">
          L O G O 
        </div>
  
        <div className="center">
          <section className='products'>
              
              <select id="select" onChange={onChangeItem} >
              <option value="DEFAULT"  selected>Choose a product ...</option>
              {data&& data.map((item_name,i)=>{
                return(
                  <option key={i} value={item_name.name}>{item_name.name}</option>
                )
              })}
              </select>
          </section>
        </div>
  
        <div className="right">
  
          <section className='user'  >
              <select onChange={handleLogout} >
                  <option selected>{setUsername}</option>
                  <option value="logout">log out</option>
              </select>
          </section>
        </div>
      </div>
    )
  }
  
  export default Header