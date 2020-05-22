import React from 'react';
import { Redirect } from 'react-router-dom'
import TopBar from './TopBar'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloggedIn: false, isFetched: false, data: {} };
    }


    render() {
        if (!this.state.isFetched) {
            return<div className='container'> <TopBar/></div>;
        }
        if (this.state.isLoggedIn) {
            return (
            <div className='container'>
                <TopBar/>
                <table><tbody>{this.createTodoTable()}</tbody></table>
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

    createTodoTable() {
        let table = [];
        table.push(
            <tr><td>Title</td><td>Description</td></tr>
        );
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            table.push(<tr>
                <td>{this.state.data[i].title}</td>
                <td>{this.state.data[i].description}</td>
            </tr>)
        }
        return table;
    }


}

export default Todo
