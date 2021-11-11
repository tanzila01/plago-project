
import React from 'react';
import {Link} from 'react-router-dom';
import "./Home.css";

const Home = () => {
    return (
    <>
<div className="wrapper">
         <div className="center">
    <h1>Welcome To Admin Panel</h1>
    <p>Simple and unique Admin panel for your small Business startup</p>
    <div className="buttons">
  <Link to="/signin"><button>Login </button></Link>
  <Link to="/signup"><button className="registerBtn">Register</button></Link>
    </div>
         </div>
</div>
    </>
    )
}

export default Home
