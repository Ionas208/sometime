import React from 'react';
import TopBar from './TopBar'
import { Redirect, Link } from 'react-router-dom'
import Logo from './Logo'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.performRegister = this.performRegister.bind(this);
        this.createRegister = this.createRegister.bind(this);
        this.state = { nameValue: "", passwordValue: "", emailValue: "", redirectToTodo: false};
    }

    render() {
        if(this.state.redirectToTodo){
            return (<Redirect to="/todo"/>);
        }
        else{
            return (
                this.createRegister()
            );
        } 
    }

    createRegister(){
        let reg = [];
        reg.push(
            <div className="container">
                <TopBar />
                <div className="loginContainer">
                    <div className="frameLarge" id="loginFrame">
                        <div className="container">
                            <h1 className="frameHeadline">Register at</h1>
                            <Logo />
                            <div className="container">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="inputContainer">
                                    <label>
                        Name:
                <input className="loginInput" type="text" value={this.state.nameValue} onChange={this.handleNameChange}></input>
                    </label>
                                    </div>
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
                                        Already have an ccount?
                            <Link className="loginLinkTo" to="/login">Login</Link>
                                    </div>
                                    <input className="loginSubmit" type="submit" value="Register" />
                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
        return reg;
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
            if(res.ok){
                this.setState({redirectToTodo: true});
            }
            else{
                alert("Register unsuccessful! Try again!")
                window.location.reload(false); 
            }
        });
    }
}

export default Register
