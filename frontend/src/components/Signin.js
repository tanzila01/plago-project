import React, { useState, useEffect } from "react";
import { ErrorMessage } from "../helpers/message";
import { Loading } from "../helpers/loading";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import { setAuthentication } from "../helpers/auth";
import { getLocalStorage } from "../helpers/localStorage";
import "./Authentication.css"

const Signin = () => {
  let history = useHistory();

  useEffect(() => {
    let storage = getLocalStorage();
    if (storage && storage.role === 1) {
      history.push("/admin/dashboard");
    } else if (storage && storage.role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: false,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Email is invalid",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({
        ...formData,
        loading: true,
      });
      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          let storage = getLocalStorage();
          if (storage && storage.role === 1) {
            history.push("/admin/dashboard");
          } else {
            setFormData({
              ...formData,
              errorMsg: "It's seems you are not an admin",
            });
          }
          //  setFormData({
          //    username: "",
          //    email: "",
          //    password: "",
          //    password2:"",
          //    loading: false,
          //    errorMsg: false,
          //    successMsg: response.data.successMessage
          //  })
        })
        .catch((err) => {
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const { email, password, errorMsg, loading } = formData;

  return (
    <div className="auth-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">ADMIN PANEL LOGIN</div>
          {loading !== false ? (
                      <div className="text-center pb-4"> {Loading()}</div>
                    ) : null}
                    {errorMsg !== false ? ErrorMessage(errorMsg) : null}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="form-group">
                  <label className="form-control-label">EMAIL</label>
                  <input type="email" className="form-control input-text" placeholder="Email Address"  name="email"
            value={email}
            onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input type="password" placeholder="Password" className="form-control input-text" name="password"
            value={password}
            onChange={handleChange} />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div className="text-white mb-3">
                    Don't have an Account? <Link className="text-green" to='/signup'>Register</Link>
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signin;
