import React from 'react';
import { Redirect } from 'react-router-dom'
import TopBar from './TopBar'
import TodoList from './TodoList'
import LeftBar from './LeftBar';
import Footer from './Footer'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloggedIn: false, isFetched: false, data: {} };
    }


    render() {
        if (!this.state.isFetched) {
            return <div className='container'> <TopBar /> <Footer/></div>;
        }
        if (this.state.isLoggedIn) {
            return (
                <div className="container">
                    <TopBar />
                    <div className="containerForLeftBar">
                        <LeftBar></LeftBar>
                        <TodoList data={this.state.data} />
                    </div>
                    <Footer/>
                </div>

            );
        }
        else {
            return <Redirect to='/login' />
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ email: this.state.emailValue, password: this.state.passwordValue })
        };
        fetch('http://localhost:3000/api/getTodo', requestOptions)
            .then(res => res.json())
            .then(json => {
                this.setState({ isLoggedIn: true, isFetched: true, data: json });
            }).catch(() => {
                this.setState({ isLoggedIn: false, isFetched: true });
            });
    }




}

export default Todo
