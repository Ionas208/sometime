import React from 'react';
import { Redirect } from 'react-router-dom'
import TopBar from './TopBar'
import Logo from './Logo'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { redirect: false, redirectToTodo: false, redirectToRegister: false};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/login' />
      );
    }
    else if (this.state.redirectToTodo) {
      return (
        <Redirect to='/todo' />
      );
    }

    else if(this.state.redirectToRegister){
      return (
        <Redirect to='/register' />
      );
    }

    else {
      return (
        <div className='container'>
          <TopBar />
          <div className='indexContainer'>
            <div className="frame" id="indexFrame">
              <div className="container">
              <div className="frameHeadline">Welcome to</div>
              <Logo/>
              <button className="indexButton" id="indexLogin" onClick={this.handleLogin}>Login</button>
              <div id="orDiv">or</div>
              <button className="indexButton" onClick={this.handleRegister}>Register</button>
              </div>
              
              </div>
          </div>

        </div>
      );
    }
  }

  componentWillMount() {
    if (localStorage.getItem("token") != null) {
      this.setState({ redirectToTodo: true })
    }
  }

  handleLogin(event) {
    this.setState({ redirect: true });
  }

  handleRegister(event){
    this.setState({redirectToRegister: true });
  }
}

export default App;
