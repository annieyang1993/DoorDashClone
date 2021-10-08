import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, getLocation, clearErrors } from '../../actions/session_actions';
import LoginForm from './login_form';


const mapStateToProps = ({ errors=[] }) => {
  return {
    errors: errors.session,
    formType: 'Login',
    navLink: <div className = "signUpNav" ><Link className = "signUpNav" to="/signup"> Sign Up</Link></div>,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    getLocation: (user_id) => dispatch(getLocation(user_id)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
