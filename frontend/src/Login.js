import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import TopBar from './TopBar'
import Logo from './Logo'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.createLogin = this.createLogin.bind(this)
        this.state = { emailValue: "", passwordValue: "", isLoggedIn: false, isFetched: false };
    }

    render() {
        if (!this.state.isFetched) {
            return this.createLogin();
        }
        if (!this.state.isLoggedIn) {
            return this.createLogin();
        }
        else {
            return <Redirect to='/todo' />
        }

    }

    createLogin() {
        let login = [];
        login.push(
            <div className="container">
                <TopBar />
                <div className="loginContainer">
                    <div className="frame" id="loginFrame">
                        <div className="container">
                            <h1 className="frameHeadline">Login to</h1>
                            <Logo />
                            <div className="container">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="inputContainer">
                                        <label>
                                            E-Mail:
                    <input className="loginInput" type="text" value={this.state.emailValie} onChange={this.handleEmailChange}></input>
                                        </label>
                                    </div>
                                    <div className="inputContainer">
                                        <label>
                                            Password:
                    <input className="loginInput" type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
                                        </label>
                                    </div>
                                    <div>
                                        Don't have an account?
                            <Link className="loginLinkTo" to="/register">Register</Link>
                                    </div>
                                    <input className="loginSubmit" type="submit" value="Login" />
                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
        return login;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.performLogin();
    }

    handleEmailChange(event) {
        this.setState({ emailValue: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ passwordValue: event.target.value });
    }

    performLogin() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.emailValue, password: this.state.passwordValue })
        };
        fetch('http://localhost:3000/api/login', requestOptions)
            .then(res => res.json())
            .then(json => {
                if (json.accessToken != null) {
                    localStorage.setItem('token', json.accessToken);
                    this.setState({ isLoggedIn: true, isFetched: true });
                }
            }).catch(() => {
                this.setState({ isLoggedIn: false, isFetched: true });
                alert("Login failed!");
            });
    }
}

export default Login
