import React from 'react';
import { GoogleLogout } from 'react-google-login'

const clientId = '513769989871-kvoln1qa7t15vm3l2hn6or1j6768ope1.apps.googleusercontent.com';

function sign_out () {
    fetch("http://localhost:4000/sign_out", {  
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function signOut() {
    const onSuccess = () => {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out from Google.');
            sign_out();
        });
    }

    return (
        <div style = {{textAlign: 'center'}}>
            <GoogleLogout
                clientId = {clientId}
                buttonText = "Sign Out from Google"
                onLogoutSuccess = {onSuccess}
            ></GoogleLogout>
        </div>
    );
}
export default signOut;
