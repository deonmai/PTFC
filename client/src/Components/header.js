import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    logOut=()=> {
        localStorage.removeItem('trainer_id');
        localStorage.removeItem('client_id');
        window.location.reload(false);
    }

    render() {
        let userLink ;
        if (localStorage.trainer_id) {
             userLink=(
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-0 mx-lg-1">
                        <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/pt_profile">
                            <Link to="/pt_profile">User</Link>
                        </a>
                    </li>
                    <li className="nav-item mx-0 mx-lg-1">
                        <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/" onClick={this.logOut}>
                            <Link to="/">Logout</Link>
                        </a>
                    </li>
                </ul>
            </div>
            )
        }
        else if (localStorage.client_id) {
            userLink=(
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-0 mx-lg-1">
                        <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/">
                            <Link to="/">User</Link>
                        </a>
                    </li>
                    <li className="nav-item mx-0 mx-lg-1">
                        <a className="nav-link py-3 px-0 px-lg-3 rounded" onClick={this.logOut} href="/">
                            <Link to="/">Logout</Link>
                        </a>
                    </li>
                </ul>
            </div>
            )
        }

        const loginRegLink=(
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/client_login">
                        <Link to="/client_login">Client Portal</Link>
                    </a>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/pt_login">
                        <Link to="/pt_login">PT Portal</Link>
                    </a>
                </li>
            </ul>
        </div>
        )

        return (

            <nav className="navbar navbar-expand-lg bg-secondary fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <Link to="/">PT Club</Link>
                </a>
                <button className="navbar-toggler navbar-toggler-right font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i className="fas fa-bars"></i></button>
                {localStorage.trainer_id || localStorage.client_id ? userLink : loginRegLink}
            </div>
        </nav>
)
    }
}
export default Header;
