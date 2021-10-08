import React from 'react';
import FooterContainer from './../footer/footer';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        console.log(user)
        this.props.processForm(user);
 
    }

    renderErrors() {
        return (
            <ul className="errors">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-form-large-container">
            <div className="login-form-container">
                <h1><img className="logo-blue" src="/Drinkly-logo-official.png" /></h1>
                <div className="topLine"></div>
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <div className = "signInText">Sign In</div>
                    <br /><div className= "test" onClick={()=>{this.props.clearErrors()}}>
                            <div className="login-prompt" >New to Drinkly? </div>{this.props.navLink}</div>
                    
                    <div className="login-form">
                        <br />
                            <label>Username: <br />
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="login-input"
                            />
                        </label>
                            <br /> <br />
                        <label>Password: <br/>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="login-input"
                            />
                            </label> <br /> 
                        <br />
                        <input className="session-submit" type="submit" value={this.props.formType} />
                        {this.props.formType==='Login' ?<input onClick={()=>{this.setState({username: 'demouser@gmail.com', password: 'demotest'})}} className="session-submit" type="submit" value={'Demo User'}/> :<div></div>}
                    {this.renderErrors()}
                    </div>
                </form>

                
            <FooterContainer/>
                
            </div>
                 
            </div>
        );
    }
}

export default LoginForm;
