import React from 'react';
import { GoogleLogin } from 'react-google-login'
import { pt_google_signin } from '../Components/UserFunctions'

const clientId = '513769989871-kvoln1qa7t15vm3l2hn6or1j6768ope1.apps.googleusercontent.com';

function google_signin_request(profile){
  // var google_id = profile.googleId;
  // var first_name = profile.givenName;
  // var last_name = profile.familyName;
  // var email = profile.email;


  const newUser = {
    google_id: profile.googleId,
    first_name: profile.givenName,
    last_name: profile.familyName,
    email: profile.email
  }

  pt_google_signin(newUser).then(() => {
    // this.props.history.push('/path')
  }).catch((error) => {
    console.log(error)
  })



  // fetch("http://localhost:4000/pt_google_signin", {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     google_id: google_id,
  //     first_name: first_name,
  //     last_name: last_name,
  //     email: email,
  //   })
  // });
}

function SignIn() {
  const onSuccess = (googleUser) => {
      console.log('LOGIN SUCCESS!')
      // Useful data for your client-side scripts:
      var profile = googleUser.profileObj;
      console.log("ID: " + profile.googleId); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.name);
      console.log('Given Name: ' + profile.givenName);
      console.log('Family Name: ' + profile.familyName);
      console.log("Image URL: " + profile.imageUrl);
      console.log("Email: " + profile.email);

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      google_signin_request(profile);
  };

  const onFailure = (response) => {
      console.log('LOGIN FAILED', response);
      // alert(`Failed to login. Please try again.`);
  };

  return (
    <div style = {{textAlign: 'center'}}>
      <GoogleLogin
        clientId = {clientId}
        buttonText = "Sign in with Google"
        onSuccess = {onSuccess}
        onFailure = {onFailure}
        cookiePolicy = {'single_host_origin'}
        style = {{ marginTop: '100px' }}
        isSignedIn = {true}
      />
    </div>
  );
}
export default SignIn;

