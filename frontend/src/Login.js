import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import TopBar from './TopBar'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = { emailValue: "", passwordValue: "", isLoggedIn: false, isFetched: false };
    }

    render() {
        if (!this.state.isFetched) {
            return (
                <div className="container">
                    <TopBar/>
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                E-Mail:
                    <input type="text" value={this.state.emailValue} onChange={this.handleEmailChange}></input>
                            </label>
                            <label>
                                Password:
                    <input type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                        <div>
                        Not logged in? 
                            <Link to="/register">Register</Link>
                        </div></div>
                </div>
            );
        }
        if (!this.state.isLoggedIn) {
            return (
                <div className="container">
                    <TopBar/>
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                E-Mail:
                    <input type="text" value={this.state.emailValie} onChange={this.handleEmailChange}></input>
                            </label>
                            <label>
                                Password:
                    <input type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                        <div>
                             Don't have an account? 
                            <Link to="/register">Register</Link>
                        </div>
                        </div>
                </div>);
        }
        else {
            return <Redirect to='/todo' />
        }

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
