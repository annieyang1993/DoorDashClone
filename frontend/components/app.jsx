import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import HomePageContainer from './homepage/homepage_container';
import RestaurantPageContainer from './restaurant_page/restaurant_container';
import Modal from './restaurant_page/modal';
import ThankYouContainer from './homepage/thankyou'

const App = () => (
  <div className="outerDiv">
    <Modal/>
    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <ProtectedRoute exact path="/homepage" component={HomePageContainer} />
      <AuthRoute exact path = "/" component={GreetingContainer}/>
      <Route path="/api/restaurants/" component={RestaurantPageContainer} />  
      <Route path="/thank-you" component={ThankYouContainer} /> 
    </Switch>

   
  </div>
);

export default App;