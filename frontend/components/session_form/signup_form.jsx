import React from 'react';
import FooterContainer from './../footer/footer';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            number: ''

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
        this.props.processForm(user);
        this.props.clearErrors();
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
            <div>
            <div className="login-form-container">
                <h1><img className="logo-blue" src="/Drinkly-logo-official.png" /></h1>
                <div className="topLine"></div>
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <div className = "signInText">Sign Up</div>
                    <br /><div className= "test" onClick={()=>{this.props.clearErrors()}}>
                           <div className="login-prompt" > Already have an account? </div> {this.props.navLink}</div>
                    
                    <div className="login-form">
                        <br />
                        <div className = "name-line">
                        <label className="login-input-name-label-1">First Name <br />
                            <input type="text"
                                value={this.state.first_name}
                                onChange={this.update('first_name')}
                                className="login-input-name1"
                            />
                        </label>
                        <label className="login-input-name-label-2">Last Name <br />
                            <input type="text"
                                value={this.state.last_name}
                                onChange={this.update('last_name')}
                                className="login-input-name2"
                            />
                        </label>
                        </div>


                            <label>Email <br />
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="login-input"
                            />
                        </label>

                        <label>Mobile Number <br />
                            <input type="text"
                                value={this.state.number}
                                onChange={this.update('number')}
                                className="login-input"
                            />
                        </label>

                         
                        <label>Password <br/>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="login-input"
                            />
                            </label> <br /> 
                        <br />
                        <input className="session-submit" type="submit" value={this.props.formType} />
                    {this.renderErrors()}
                    </div>
                    
                </form>
                
                <FooterContainer />
            </div>
                
            </div>
        );
    }
}

export default LoginForm;
