import React from 'react';
import { Redirect } from 'react-router-dom'

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = { username: "", isLoggedIn: false, isFetched: false, redirectToLogin: false, redirectToIndex: false }
        this.handleLoginRedirect = this.handleLoginRedirect.bind(this);
        this.createUserCard = this.createUserCard.bind(this);
    }

    render() {
        if (this.state.redirectToLogin) {
            return (
                <Redirect to='/login' />
            );
        }
        if (this.state.redirectToIndex) {
            return (
                <Redirect to='/' />
            );
        }
        if (!this.state.isFetched) {
            return this.createUserCard();
        }
        else {
            return this.createUserCard();

        }

    }

    createUserCard(){
        let usercard = [];

        if(this.state.isLoggedIn){
            usercard.push(
                <div className="UserCard">
                        <i className="fas fa-user UserCardIcon"></i>
                        <div className="UserCardText" >Hello, {this.state.username}</div>
                        <button className="UserCardButton" onClick={this.logout}>logout</button>
                </div>
            )
        }
        else{
            usercard.push(
                <div className="UserCard">
                        <i className="fas fa-user UserCardIcon"></i>
                        <button className="UserCardButton" onClick={this.handleLoginRedirect}>login</button>
                </div>
            )
        }

        return usercard;
    }

    logout(event) {
        localStorage.removeItem('token')
        this.setState({ redirectToIndex: true });
        this.updateUsername();
    }

    handleLoginRedirect(event) {
        this.setState({ redirectToLogin: true });
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
                this.setState({ isLoggedIn: true, isFetched: true, username: json[0].username });
            }).catch(() => {
                this.setState({ isLoggedIn: false, isFetched: true });
            });
    }
}

export default UserCard;