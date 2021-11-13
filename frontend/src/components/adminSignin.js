
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { getLocalStorage } from '../helpers/localStorage';
import {Row, Col} from 'antd';
import './adminSignin.css'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { adminSignin } from '../api/auth';
import { setAuthentication } from '../helpers/auth';
import { ErrorMessage } from "../helpers/message";

export default function AdminSignin() {
    let history = useHistory();
      // useEffect(() => {
      //   let storage = getLocalStorage();
      //   if (storage && storage.role === 1) {
      //       history.push("/admin/dashboard");
      //   } else if(storage && storage.role === 0) {
      //       history.push("/user/dashboard");
      //   }
      // }, [history])
      
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
          adminSignin(newData)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          let storage = getLocalStorage();
          if (storage && storage.role === 0) {
            history.push("/admin/dashboard");
          }
           else {
            setData({
              ...data,
              errorMsg: "please register first",
            });
          }
        })
        .catch((err) => {
          setData({
            ...data,
            errorMsg: err.response.data.errorMessage,
          });
        });

        }
      }

    return (
        <div className="signin-bg" >
            <div className="main-row">
                <Row>
                    <Col className="main-col" xs={12} sm={12} md={12} lg={12} xl={12} offset={6}>
                        <form  onSubmit={(e) => formHandler(e)}>
                            <Row className="key-row">
                              {/* <div cla="login-key"> */}
                                <i className="fa fa-key login-key" aria-hidden="true"></i>
                              {/* </div> */}
                            </Row>
                            <Row className="head-row">
                              <h3 className="login-head">User Panel Login</h3>
                            </Row>
                            <Row className="error-row">
                              {data.errorMsg !== false ? ErrorMessage(data.errorMsg) : null}
                            </Row>
                            <Row className="input-row">
                              <input className="inputs" name="email" value={data.email || ""} type="email" placeholder="Email" onChange={emailHandler} />
                            </Row>
                            <Row className="input-row">
                              <input className="inputs" name="password" type="password" value={data.password || ""} placeholder="Password" onChange={emailHandler} />                    
                            </Row>
                            <Row className="input-rows">
                                <button className="btn-loginss" type="submit">Login</button>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
 