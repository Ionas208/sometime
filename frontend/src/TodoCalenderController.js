import React from 'react';
import TodoCalender from './TodoCalender'
import TopBar from './TopBar';
import LeftBar from './LeftBar'
import Footer from './Footer'
import { Redirect } from 'react-router-dom'

class TodoCalenderController extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let year = today.getYear() + 1900;
        let month = today.getMonth();
        this.state = { month: month, year: year, redirectToLogin: false }
        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);
    }


    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/login"/>
        }
        else {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return (
                <div className="container">
                    <TopBar />
                    <div className="containerForLeftBar">
                        <LeftBar className="LeftBar" />
                        <div className="calenderContainer">
                            <div className="calenderControls">
                                <div className="calenderBackButton" onClick={this.back}><i class="fas fa-arrow-left"></i></div>
                                <h2 className="calenderMonthTitle">{monthNames[this.state.month]} {this.state.year}</h2>
                                <div className="calenderForwardButton" onClick={this.forward}><i class="fas fa-arrow-right"></i></div>
                            </div>
                            <TodoCalender month={this.state.month} year={this.state.year} />
                        </div>
                    </div>
                    <Footer />
                </div>);
        }

    }

    back(event) {
        if (this.state.month === 0) {
            this.setState({ month: 11, year: this.state.year - 1 })
        }
        else {
            this.setState({ month: this.state.month - 1 })
        }
    }

    forward(event) {
        if (this.state.month === 11) {
            this.setState({ month: 0, year: this.state.year + 1 })
        }
        else {
            this.setState({ month: this.state.month + 1 })
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        };
        fetch('http://localhost:3000/api/checkToken', requestOptions)
            .then((res)=>{
                if(!res.ok){
                    this.setState({redirectToLogin: true})
                }
                else{
                }
            })
    }
}

export default TodoCalenderController