import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import home from './Pages/home';
import pt_login from './Pages/pt_login';
import pt_signup from './Pages/pt_signup';
import pt_profile from './Pages/pt_profile';
import pt_availability from './Pages/pt_availability';
import client_booking from './Pages/client_booking';
import client_login from './Pages/client_login';
import client_signup from './Pages/client_signup';
import pt_results from './Pages/pt_results';

import pt_requestpage from './Pages/pt_requestpage'
import admin_dashboard from './Pages/admin_dashboard'
import admin_results from './Pages/admin_results';
import AdminLogin from './Pages/admin_login';

// import FileUpload from '../Components/image_upload';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/pt_login" component={pt_login} />
          <Route exact path="/pt_signup" component={pt_signup} />
          <Route exact path="/pt_profile" component={pt_profile} />
          <Route exact path="/pt_availability" component={pt_availability} />
          <Route exact path="/client_booking" component={client_booking} />
          <Route exact path="/client_login" component={client_login} />
          <Route exact path="/client_signup" component={client_signup} />
          <Route exact path="/pt_results" component={pt_results} />
          <Route exact path="/pt_requestpage" component={pt_requestpage} />

          <Route exact path="/admin_dashboard" component={admin_dashboard} />
          <Route exact path="/admin_results" component={admin_results} />

          <Route exact path="/admin_login" component= {AdminLogin} />
          {/* <Route exact path="/file_upload" component={file_upload} /> */}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
