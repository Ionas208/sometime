import React from 'react';
import TopBar from './TopBar'
import { Redirect, Link } from 'react-router-dom'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.performRegister = this.performRegister.bind(this);
        this.state = { nameValue: "", passwordValue: "", emailValue: "" };
    }

    render() {
        return (
            <div className="container">
                <TopBar/>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                <input type="text" value={this.state.nameValue} onChange={this.handleNameChange}></input>
                    </label>

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
                             Already have an account? 
                            <Link to="/login">Login</Link>
                        </div>
            </div>);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.performRegister();
    }

    handleNameChange(event) {
        this.setState({ nameValue: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ emailValue: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ passwordValue: event.target.value });
    }

    performRegister() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: this.state.nameValue, email: this.state.emailValue, password: this.state.passwordValue})
        };
        fetch('http://localhost:3000/api/register', requestOptions).then(res =>{
            console.log(res);
        });
    }
}

export default Register
