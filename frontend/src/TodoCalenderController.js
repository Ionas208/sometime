import React from 'react';
import TodoCalender from './TodoCalender'
import TopBar from './TopBar';
import LeftBar from './LeftBar'
import Footer from './Footer'

class TodoCalenderController extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let year = today.getYear() + 1900;
        let month = today.getMonth();
        this.state = { month: month, year: year }
        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);
    }


    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return (
        <div className="container">
            <TopBar />
            <div className="containerForLeftBar">
                <LeftBar className="LeftBar" />
                <div className="container">
                    <div className="calenderControls">
                        <button className="calenderBackButton" onClick={this.back}>back</button>
                        <h2 className="calenderMonthTitle">{monthNames[this.state.month]} {this.state.year}</h2>
                        <button className="calenderForwardButton" onClick={this.forward}>forward</button>
                    </div>
                    <TodoCalender month={this.state.month} year={this.state.year} />
                </div>
            </div>
            <Footer/>
        </div>);
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
}

export default TodoCalenderController