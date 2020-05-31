import React from 'react';
import { Redirect } from 'react-router-dom'

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = { username: "", isLoggedIn: false, isFetched: false, redirectToLogin: false , redirectToIndex: false}
        this.handleLoginRedirect = this.handleLoginRedirect.bind(this);
    }

    render() {
        if(this.state.redirectToLogin){
            return(
                <Redirect to='/login' />
            );
        }
        if(this.state.redirectToIndex){
            return(
                <Redirect to='/' />
            );
        }
        else{
            if (!this.state.isFetched) {
                return (
                    <div className="UserCard">
                        <i className="fas fa-user"></i>
                        <button onClick={this.handleLoginRedirect}>login</button>
                    </div>
                );
            }
            else {
                if (this.state.isLoggedIn) {
                    return (
                        <div className="UserCard">
                            <i className="fas fa-user"></i>
                            <div>{this.state.username}</div>
                            <button onClick={this.logout}> logout</button>
                        </div>
                    );
                }
                else {
                    return (
    
                        <div className="UserCard">
                            <i className="fas fa-user"></i>
                            <button onClick={this.handleLoginRedirect}>login</button>
                        </div>
                    );
                }
    
            }
        } 
    }

    logout(event) {
        localStorage.removeItem('token')
        this.setState({redirectToIndex: true});
        this.updateUsername();
    }

    handleLoginRedirect(event){
        this.setState({redirectToLogin: true});
    }

    componentDidMount() {
        this.updateUsername();
    }

    updateUsername() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        };
        fetch('http://localhost:3000/api/getUsernameFromToken', requestOptions)
            .then(res => res.json())
            .then(json => {
                this.setState({ isLoggedIn: true, isFetched: true, username: json.username });
            }).catch(() => {
                this.setState({ isLoggedIn: false, isFetched: true });
            });
    }
}

export default UserCard;