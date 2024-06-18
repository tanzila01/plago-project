
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import {logout} from '../helpers/auth';


const AdminHome = ({history}) => {
    const handleLogout = () =>{
        logout(() =>{
          history.push('/')
        })
      }
    return (
        <>
        <div className="wrapper">
                 <div className="center">
            <h1>Welcome To Admin Panel</h1>
            <p>Simple and unique Admin panel for your small Business startup</p>
            <div className="buttons">
          <Link to="/admin/dashboard"><button>Dashboard </button></Link>
          <button className="registerBtn"  onClick={handleLogout}>Logout</button>
            </div>
                 </div>
        </div>
            </>
    )
}

export default AdminHome
