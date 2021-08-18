import React, { Component } from 'react';
import { pt_login } from '../Components/UserFunctions'
import Footer from '../Components/footer';
import Header from '../Components/header';

// CSS
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css' // tick mark
import './fonts/iconic/css/material-design-iconic-font.min.css' // alt tick mark
import './stylesheets/login-signup.css'
import './stylesheets/gen-utility.css'

//needs form validator here (TBC)
class PTLogin extends Component {

   constructor(props) {
      super(props);
      this.state = {
          hidden: true,
          validateEmail: '',
          validatePass: '',
      };
      this.email = '';
      this.pass = '';
   }

   handleLogin = (event) => {
      event.preventDefault();

      const user = {
         email: this.email,
         password: this.pass
      }

      pt_login(user)
         .then((data => {
            console.log(data);
            window.location.replace("http://localhost:3000/pt_profile");
         }))
         .catch(err => console.log(err))
   }


   formChangeHandler = (event) => {
      if (event.target.name === "email") { // for email fields
         const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if(email_pattern.test(event.target.value)) { // checking if it abides by email formats
            this.setState({validateEmail: 'has-val true-validate'});
            this.email = event.target.value;
         } else {
            this.setState({validateEmail: 'alert-validate'});
         }
      }
      else if (event.target.name === "pass") { // for passwords
         if (event.target.value !== '') {
            this.setState({validatePass: 'has-val true-validate'});
            this.pass = event.target.value; // saving password
         } else {
            this.setState({validatePass: 'alert-validate'});
         }
      }
   }

    render() {
        return (
            <div>
                <Header />
                <div style = {{marginTop: '4.5em'}}> </div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="login100-more bg-img"></div>
                            <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                               <form className="login100-form validate-form">
                                  <a href = "/pt_signup">
                                      <span className = "coloured-hov alt-form-title all-titles">Sign Up</span>
                                  </a>
                                  <span className = "all-titles">|</span>
                                  <a href = "/pt_login">
                                      <span className = "current-form-title all-titles p-b-59">Log In</span>
                                  </a>
                                  <div className="wrap-input100 validate-input" data-validate = "Valid email is required: john_doe@email.com">
                                     <span className="label-input100">Email</span>
                                     <input className="input100" type="text" name="email" placeholder="Email Address..." onChange = {this.formChangeHandler} required></input>
                                     <span className="focus-input100"></span>
                                  </div>
                                  <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                     <span className="label-input100">Password</span>
                                     <input className="input100" type="password" name="pass" placeholder="*************" onChange = {this.formChangeHandler} required></input>
                                     <span className="focus-input100"></span>
                                  </div>
                                  <div className="flex-m w-full p-b-33">
                                     <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"></input>
                                        <label className="label-checkbox100" for="ckb1">
                                            <span className="txt1">
                                                Remember Me
                                            </span>
                                        </label>
                                     </div>
                                  </div>
                                  <div className="container-login100-form-btn">
                                     <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        {/* <Link to='/pt_profile'> */}
                                            <button className="login100-form-btn" onClick = {this.handleLogin}>
                                               Log In
                                            </button>
                                          {/* </Link> */}
                                        </div>
                                     </div>
                                  <div className = "label-input100" style = {{paddingTop: '1em', paddingBottom: '1em', display: 'block'}}>
                                    <u><a className="text-gray-light" href="/">Forgot password?</a></u>
                                  </div>
                               </form>
                            </div>
                          </div>
                       </div>
                    <Footer />
                  </div>
        )
    }
}
export default PTLogin;