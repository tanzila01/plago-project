import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getLocalStorage } from '../helpers/localStorage';
import {Row, Col} from 'antd';
import Header from './Header';
import './adminSignin.css'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';
import { setAuthentication } from '../helpers/auth';
// import {gbimage} from "../../public/gbimage.jpg"

export default function AdminSignin() {
    let history = useHistory();
    //   useEffect(() => {
    //     let storage = getLocalStorage();
    //     if (storage && storage.role === 1) {
    //         history.push("/admin/dashboard");
    //     } else if(storage && storage.role === 0) {
    //         history.push("/user/dashboard");
    //     }
    //   }, [history])
      
      const iniState = {
        email: "",
        password: "",
        errorMsg: false
      }
      const[data, setData] = useState(iniState)
      const emailHandler = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        })
      }
      console.log("data in y form", data)

    //   const formHandler = (e) => {
    //       alert("submitted")
    //   }

    const formHandler = (e) => {
        e.preventDefault();
        if (isEmpty(data.email) || isEmpty(data.password)){ 
          setData({
            ...data,
            errorMsg: "both fields are required"
          })
        } else if(!isEmail(data.email)) { 
          setData({
            ...data,
            errorMsg: "email invalid"
          })
        } else {
          const {email, password} = data;
          const newData = {email, password}
        signin(newData)
        .then((response) => {
            console.log("response of req",response)
          setAuthentication(response.data.token, response.data.user);
          console.log("user auth", response.data.user)
          let storage = getLocalStorage();
          if (storage && storage.role === 0) {
            history.push("/admin/dashboard");
          // } else if (storage && storage.role === 0) {
          //   history.push("/user/dashboard");
          }
           else {
            setData({
              ...data,
            //   errorMsg: "It's seems you are not an admin",
            });
          }
        })
        .catch((err) => {
          setData({
            ...data,
            // errorMsg: err.response.data.errorMessage,
          });
        });

        }

        alert("submitted")
      }


    return (
        <div style={{backgroundImag:""}} >
            <Row>
                <Col className="main-col" xs={18} sm={12} md={12} lg={12} xl={12} offset={6}>
                    <form>
                        <Row className="key-row">
                          {/* <div cla="login-key"> */}
                            <i className="fa fa-key login-key" aria-hidden="true"></i>
                          {/* </div> */}
                        </Row>
                        <Row className="head-row">
                          <h3 className="login-head">Admin Panel Login</h3>
                          {/* {errorMsg !== false ? ErrorMessage(errorMsg) : null} */}
                        </Row>
                        <Row className="input-row">
                          <input className="inputs" name="email" value={data.email || ""} type="email" placeholder="Email" onChange={emailHandler} />
                        </Row>
                        <Row className="input-row">
                          <input className="inputs" name="password" type="password" value={data.password || ""} placeholder="Password" onChange={emailHandler} />                    
                        </Row>
                        <Row>
                            <button className="btn" type="submit" onClick={() => formHandler(data)}>Login</button>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    )
}
 