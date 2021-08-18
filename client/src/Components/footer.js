import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="mb-4">LOCATION</h4>
                        <p className="pre-wrap lead mb-0 text-white">2215 John Daniel Drive
Clark, MO 65243
                        </p>

                    </div>
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="mb-4">AROUND THE WEB</h4><a className="btn btn-outline-light btn-social mx-1" href="https://www.facebook.com/StartBootstrap"><i className="fab fa-fw fa-facebook-f"></i></a><a className="btn btn-outline-light btn-social mx-1" href="https://www.twitter.com/sbootstrap"><i className="fab fa-fw fa-twitter"></i></a><a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/in/startbootstrap"><i className="fab fa-fw fa-linkedin-in"></i></a><a className="btn btn-outline-light btn-social mx-1" href="https://www.dribble.com/startbootstrap"><i className="fab fa-fw fa-dribbble"></i></a>
                    </div>
                    <div className="col-lg-4">
                        <h4 className="mb-4">ABOUT PT CLUB</h4>
                        <p className="pre-wrap lead mb-0 text-white">PT Club is social media for fitness enthusiasts looking for a PT! <br/><a style = {{fontSize: '1em'}} href = "/client_signup">Join us now!</a></p>
                    </div>
                </div>
            </div>
            <div className = "col-lg-4 admin-login-bottom-container">
                <a className = "mb-0 admin-login-text" href = "/admin_login"><i className = "fas fa-cog"></i> Adminstrator Login</a>
            </div>
        </footer>
)
    }
}
export default Footer;
