// Last updated: 7/09/2020
import React, { Component } from 'react';
import {Modal} from 'react-rainbow-components';
import Footer from '../Components/footer';
import Header from '../Components/header';

// CSS
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'; // tick mark
import './fonts/iconic/css/material-design-iconic-font.min.css'; // alt tick mark
import './stylesheets/login-signup.css';
import './stylesheets/gen-utility.css';

import { client_signup } from '../Components/UserFunctions';

class ClientSignup extends Component {
    // DATA EXTRACTION & INPUT VALIDATION
    constructor(props) {
        super(props);
        this.state = {
            validateFirstName: '',
            validateLastName: '',
            validateEmail: '',
            validatePass: '',
            validateRepeatPass: '',
            googleLogin: '',
            isOpen: false,
            tncAccepted: false,
            tncError : 'none',
        };
        this.firstName = ``; // Global for later customisation & backend post reqs
        this.lastName = ``;
        this.pass = ``;
        this.email = ``;
    }

    formChangeHandler = (event) => {
        if (event.target.name === "first_name") {
            if(/[~!@#$%^&*(),.?":{}|<>]/g.test(event.target.value) || /\d+/g.test(event.target.value) || event.target.value === '') { // checking for numbers or special characters
                this.setState({validateFirstName: 'alert-validate'});
            } else { // if valid input, capitalise it
                event.target.value = event.target.value.slice(0,1).toUpperCase() + event.target.value.slice(1,event.target.value.length);
                this.setState({validateFirstName: 'has-val true-validate'});
                this.firstName = event.target.value;
            }
        } else if (event.target.name === "last_name") { // for name fields
            if(/[~!@#$%^&*(),.?":{}|<>]/g.test(event.target.value) || /\d+/g.test(event.target.value) || event.target.value === '') { // checking for numbers or special characters
                this.setState({validateLastName: 'alert-validate'});
            } else { // if valid input, capitalise it
                event.target.value = event.target.value.slice(0,1).toUpperCase() + event.target.value.slice(1,event.target.value.length);
                this.setState({validateLastName: 'has-val true-validate'});
                this.lastName = event.target.value;
            }
        } else if (event.target.name === "email") { // for email fields
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
        } else if (event.target.name === "repeat-pass") { // confirming password
            if (event.target.value === this.pass && event.target.value !== '') { // if the same, then valid
                this.setState({validateRepeatPass: 'has-val true-validate'});
            } else {
                this.setState({validateRepeatPass: 'alert-validate'});
            }
        }
    }

    handleOnClose = () => {
        this.setState({
            isOpen: false,
            tncAccepted: false,
        });
    }

    handleSubmit = (event) => { // BACKEND STUFF HERE
        const allOk = 'has-val true-validate';
        const errorMsg = 'alert-validate';
        if (this.state.tncAccepted === false) {
            this.setState({ tncError: 'block' });
            event.preventDefault();
        }
        if (this.state.validateFirstName !== allOk) { // not ok
            this.setState({validateFirstName: errorMsg});
            event.preventDefault();
        }
        if (this.state.validateLastName !== allOk) { // not ok
            this.setState({validateLastName: errorMsg});
            event.preventDefault();
        }
        if (this.state.validateEmail !== allOk) { // not ok
            this.setState({validateEmail: errorMsg});
            event.preventDefault();
        }
        if (this.state.validatePass !== allOk) { // not ok
            this.setState({validatePass: errorMsg});
            event.preventDefault();
        }
        if (this.state.validateRepeatPass !== allOk) { // not ok
            this.setState({validateRepeatPass: errorMsg});
            event.preventDefault();
        }
        // if all okay BACKEND STUFF (will revert to document.getElement thing (27/08/2020))
        if (this.state.tncAccepted === true && this.state.validateFirstName === allOk && this.state.validateLastName === allOk && this.state.validateEmail === allOk && this.state.validatePass === allOk && this.state.validateRepeatPass === allOk) {
            event.preventDefault();

            const newUser = {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.pass
            }

            // this function returns a promise
            client_signup(newUser)
                .then((data => {
                    window.location.replace("http://localhost:3000/");
                }))
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div style = {{marginTop: '4.5em'}}> </div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                           <form className="login100-form validate-form">
                              <a href="/client_signup">
                                  <span className = "current-form-title all-titles p-b-59">Sign Up</span>
                              </a>
                              <span className = "all-titles">|</span>
                              <a href = "/client_login">
                                  <span className = "coloured-hov alt-form-title all-titles">Log In</span>
                              </a>
                              <div className= {`wrap-input100 validate-input ${this.state.validateFirstName}`} data-validate="Valid name required">
                                 <span className="label-input100">First Name</span>
                                 <input className= {`input100 ${this.state.validateFirstName}`} type="text" name="first_name" id="first_name" placeholder="First Name..." onChange = {this.formChangeHandler} required></input>
                                 <span className= "focus-input100"></span>
                              </div>
                              <div className= {`wrap-input100 validate-input ${this.state.validateLastName}`} data-validate="Valid name required">
                                 <span className="label-input100">Last Name</span>
                                 <input className={`input100 ${this.state.validateLastName}`} type="text" name="last_name" id="last_name" placeholder="Last Name..." onInput = {this.formChangeHandler} required></input>
                                 <span className="focus-input100"></span>
                              </div>

                              <div className= {`wrap-input100 validate-input ${this.state.validateEmail}`} data-validate = "Valid email is required: john_doe@email.com">
                                 <span className="label-input100">Email</span>
                                 <input className={`input100 ${this.state.validateEmail}`} type="email" name="email" id="email" placeholder="Email Address..." onChange = {this.formChangeHandler} required></input>
                                 <span className="focus-input100"></span>
                              </div>
                              <div className= {`wrap-input100 validate-input ${this.state.validatePass}`} data-validate = "Password is required">
                                 <span className="label-input100">Password</span>
                                 <input className={`input100 ${this.state.validatePass}`} type="password" name="pass" id = "pass" placeholder="*************" onChange = {this.formChangeHandler}></input>
                                 <span className="focus-input100"></span>
                              </div>
                              <div className= {`wrap-input100 validate-input ${this.state.validateRepeatPass}`} data-validate = "Please confirm your password">
                                 <span className="label-input100">Confirm Password</span>
                                 <input className={`input100 ${this.state.validateRepeatPass}`} type="password" name="repeat-pass" id="repeat-pass" placeholder="*************" onChange = {this.formChangeHandler}></input>
                                 <span className="focus-input100"></span>
                              </div>
                              <div className="flex-m w-full p-b-33">
                                 <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" onClick = {() => this.setState({tncAccepted: true, tncError: 'none'})}></input>
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        <div style = {{display: `${ this.state.tncError }`, color : 'red', fontSize: '0.7em', fontStyle: 'italic'}}> *Please accept the terms & conditions </div>
                                        <span className="txt1">
                                            I agree to the
                                            <span className="txt2 coloured-hov" onClick = {()=>this.setState({isOpen:true})}> Terms & Conditions</span>
                                        </span>
                                    </label>
                                 </div>
                              </div>
                              <div className="container-login100-form-btn">
                                 <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" onClick = {this.handleSubmit}>
                                        Sign Up Now
                                        </button>
                                    </div>
                                </div>
                           </form>
                               <Modal
                                 id = "modal-2"
                                 isOpen={this.state.isOpen}
                                 onRequestClose={this.handleOnClose}
                                 size = 'large'
                                 footer = {
                                     <div className="container-login100-form-btn" style = {{float: 'right'}}>
                                        <div className="wrap-login100-form-btn">
                                           <div className="login100-form-bgbtn"></div>
                                               <button className="login100-form-btn" onClick = {() => this.setState({isOpen: false, tncAccepted: true, tncError: 'none'})}>
                                               I accept
                                               </button>
                                        </div>
                                     </div>
                                 }
                               >
                                     <h1> Terms & Conditions for Personal Trainer Club </h1>
                                     <hr />
                                     <span className = "fine-print"> Last updated: August 26, 2020 </span>

                                     <p> Please read these terms and conditions carefully before using Our Service. </p>

                                     <h2> Interpretation and Definitions </h2>
                                     <p> Interpretation
                                     The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

                                     Definitions
                                     For the purposes of these Terms and Conditions:

                                     Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

                                     Country refers to: South Australia, Australia

                                     Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to PFTC3, 2215 John Daniel Drive Clark, MO 65243.

                                     Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

                                     Service refers to the Website.

                                     Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.

                                     Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

                                     Website refers to Personal Trainer Club, accessible from http://personaltrainerclub.com

                                     You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

                                     <h2> Acknowledgment</h2>
                                     These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.

                                     Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.

                                     By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.

                                     You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.

                                     Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.

                                     <h2> Links to Other Websites </h2>
                                     Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.

                                     The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.

                                     We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.

                                     <h2> Termination </h2>
                                     We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

                                     Upon termination, Your right to use the Service will cease immediately.

                                     <h2> Limitation of Liability </h2>
                                     Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.

                                     To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

                                     Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.

                                     "AS IS" and "AS AVAILABLE" Disclaimer
                                     The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

                                     Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

                                     Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.

                                     <h2> Governing Law </h2>
                                     The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.

                                     <h2> Disputes Resolution </h2>
                                     If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.

                                     <h2> For European Union (EU) Users </h2>
                                     If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.

                                     <h2> United States Legal Compliance </h2>
                                     You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.

                                     <h2> Severability and Waiver </h2>
                                     <h3> Severability </h3>
                                     If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

                                     <h3> Waiver </h3>
                                     Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.

                                     <h2> Translation Interpretation </h2>
                                     These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.

                                     <h2> Changes to These Terms and Conditions </h2>
                                     We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.

                                     By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
                                     </p>

                                     <h2> Contact Us </h2>
                                     <p> If you have any questions about these Terms and Conditions, You can contact us:

                                     By phone number: +61 12341234123

                                     By mail: 2215 John Daniel Drive Clark, MO 65243
                                     </p>
                               </Modal>
                        </div>
                        <div className="login100-more bg-img"></div>
                    </div>
                </div>
            <Footer />
          </div>
        )
    }
}
export default ClientSignup;
