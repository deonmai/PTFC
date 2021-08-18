// This is the adminstrative login page.
import React, { Component } from 'react';
import Footer from '../Components/footer';
import Header from '../Components/header';

// CSS
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css' // tick mark
import './fonts/iconic/css/material-design-iconic-font.min.css' // alt tick mark
import './stylesheets/login-signup.css'
import './stylesheets/gen-utility.css'

import { admin_login } from '../Components/UserFunctions'

class AdminLogin extends Component {

   constructor(props) {
      super(props);
      this.state = {
          hidden: true,
          validateUserName: '',
          validatePass: '',
      };
      this.username = ``;
      this.pass = ``;
  }
   formChangeHandler = (event) => {
      if (event.target.name === "username") { // for email fields
         if(event.target.value !== '') { // checking if it abides by email formats
            this.setState({validateUserName: 'has-val true-validate'});
            this.username = event.target.value;
         } else {
            this.setState({validateUserName: 'alert-validate'});
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

   handleLogin = (event) => {
      event.preventDefault();

      const user = {
         username: this.username,
         password: this.pass
      }

      admin_login(user)
         .then((data => {
            console.log(data);
            window.location.replace("http://localhost:3000/admin_dashboard");
         }))
         .catch(err => console.log(err))
   }

    render() {
        return (
            <div className = "admin-casing">
                <Header />
                <div style = {{marginTop: '4.5em'}}> </div>
                <div className="admin-limiter">
                    <div className="container-login100">
                            <div className="admin-login-wrap p-l-50 p-r-50 p-t-72 p-b-50">
                               <form className="login100-form validate-form">
                                  <span className = "admin-form-title all-titles p-b-10">Adminstrator Login <i className = "animate-cog fas fa-cog"></i></span>
                                  <span className = "fine-print p-b-59">This form is for adminstrator use only.</span>
                                  <div className={`wrap-input100 validate-input ${this.state.validateUserName}`} data-validate = "Username is required">
                                     <span className="label-input100">Username</span>
                                     <input className="input100" type="text" name="username" placeholder="Username..." onChange = {this.formChangeHandler} required></input>
                                     <span className="focus-input100"></span>
                                  </div>
                                  <div className={`wrap-input100 validate-input ${this.state.validatePass}`} data-validate = "Password is required">
                                     <span className="label-input100">Password</span>
                                     <input className="input100" type="password" name="pass" placeholder="*************" onChange = {this.formChangeHandler} required></input>
                                     <span className="focus-input100"></span>
                                  </div>
                                  <div className="container-login100-form-btn">
                                     <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                            <button className="login100-form-btn" onClick = {this.handleLogin}>
                                            Log In
                                            </button>
                                        </div>
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
export default AdminLogin;
