import React,{useState , useEffect} from "react";
import {Link , useHistory} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import {ErrorMessage, SuccessMessage} from '../helpers/message';
import {Loading} from '../helpers/loading';
import {signup} from '../api/auth';
import {getLocalStorage} from '../helpers/localStorage';

const Signup = () => {
  let history = useHistory()

  useEffect(() => {
    let storage =  getLocalStorage()
    if(storage && storage.role === 1){
      history.push('/admin/dashboard')
    }else if(storage && storage.role === 0){
       history.push('/user/dashboard')
    }
  }, [history])

      const [formData , setFormData] = useState({
          username: "",
          email: "",
          password: "",
          password2:"",
          successMsg: false,
          errorMsg: false,
          loading: false
      })

      const {username, email, password, password2,successMsg,errorMsg,loading} = formData

      const handleChange = (evt) =>{
   setFormData({
       ...formData,
       [evt.target.name]: evt.target.value,
       successMsg: false,
       errorMsg: false
   })
     }

     const handleSubmit = (evt) =>{
     evt.preventDefault()
   if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
       setFormData({
         ...formData,
          errorMsg: "All fields are required"
       })
   }else if(!isEmail(email)){
    setFormData({
      ...formData,
       errorMsg: "Email is invalid"
    })   
   } else if(!equals(password , password2)){
    setFormData({
      ...formData,
       errorMsg: "passwords do not match"
    })   
   }else{
    
    const {email, username, password} = formData
    const data  = {username, email , password}

      setFormData({ 
         ...formData,
         loading: true
      })

      signup(data).then( (response) =>{
    setFormData({
      username: "",
      email: "",
      password: "",
      password2:"",
      loading: false,
      errorMsg: false,
      successMsg: response.data.successMessage
    })
      }).catch(err =>{
        setFormData({...formData , loading: false , errorMsg: err.response.data.errorMessage})
      })
   }

    }

  return (
 
  <div className="auth-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 register-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">ADMIN PANEL REGISTER</div>
          {loading !== false ? (
                      <div className="text-center pb-4"> {Loading()}</div>
                    ) : null}
                    {errorMsg !== false ? ErrorMessage(errorMsg) : null}
                    {successMsg !== false ? SuccessMessage(successMsg) : null}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={(e) => handleSubmit(e)} noValidate>
              <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <input type="text" className="form-control input-text text-style" placeholder="UserName"  name="username"
            value={username}
            onChange={handleChange}/>
                </div>
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
                <div className="form-group">
                  <label className="form-control-label">CONFIRM PASSWORD</label>
                  <input type="password" placeholder="Confirm Password" className="form-control input-text" name="password2"
            value={password2}
            onChange={handleChange} />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div className="text-white mb-3">
                    Already have an Account? <Link className="text-green" to='/signin'>Login</Link>
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      REGISTER
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

export default Signup;
