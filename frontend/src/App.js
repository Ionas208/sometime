import React from 'react';
import {Redirect} from 'react-router-dom'
import TopBar from './TopBar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {redirect: false};
    this.handleLogin = this.handleLogin.bind(this);
  }

  render() {
    if(this.state.redirect){
      return(
        <Redirect to='/login' />
      );
    }
    else{
      return (
        <div className='container'>
          <TopBar/>
          HELLO FROM THE INDEX SITEEEE
          <button  onClick={this.handleLogin}>login</button>
        </div>
      );  
    }
  }

  handleLogin(event){
    this.setState({redirect: true});
  }
}

export default App;
