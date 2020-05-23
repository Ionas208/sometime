import React from 'react';

class TodoCalender extends React.Component {
    constructor(props) {
        super(props);
        this.state = { month: this.props.month, year: this.props.year }

        this.createTodoCalender = this.createTodoCalender.bind(this);
    }


    static getDerivedStateFromProps(props, state) {
        if (props.month !== state.month || props.year !== state.year) {
          return {
            month: props.month,
            year: props.year
          };
        }
        return null;
      }

    render() {
        return (<table className="calenderTable"><tbody className="calenderBody">{this.createTodoCalender()}</tbody></table>);
    }

    createTodoCalender() {
        let table = [];
        table.push(
        );
        let days = this.daysInMonth(this.state.year, this.state.month);
        let rows = days;
        if (rows / 7 > parseInt(rows / 7)) {
            rows = (rows / 7) + 1;
        }
        else {
            rows = rows / 7;
        }
        let daycounter = 1;
        for (let i = 0; i < rows; i++) {
            let partData = [];
            for (let j = 0; j < 7 && daycounter <= days; j++) {
                partData.push(<td className="calenderTile"><TodoCalenderTile day={daycounter} month={this.state.month} year={this.state.year} /></td>);
                daycounter++;
            }
            table.push(<tr className="calenderRow">
                {partData}
            </tr>)
        }
        return table;
    }

    daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
}

class TodoCalenderTile extends React.Component {
    constructor(props) {
        super(props);  
        this.state = { day: props.day, month: props.month, year: props.year, todos: [] }
        this.createTodoList = this.createTodoList.bind(this)
        this.updateTasks = this.updateTasks.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.month !== state.month) {
          return {
            month: props.month,
            year: props.year
          };
        }
        return null;
      }

    componentDidUpdate(prevProps){
        if(this.props.month !== prevProps.month){
            this.updateTasks();
        }
    }

    render() {
        return (<div>{this.createTodoList()}</div>)
    }

    createTodoList() {
        let list = [];
        let items = [];
        for (let i = 0; i < Object.keys(this.state.todos).length; i++) {
            items.push(<div className="calenderTodoTileTask">
                <div className="calenderTodoTileTaskTitle">{this.state.todos[i].title}</div>
            </div>)
        }
        list.push(<div><h4>{this.state.day}</h4><div>{items}</div></div>)
        return list;
    }

    componentDidMount() {
        this.updateTasks();
    }

    updateTasks(){
        let date = "{0}-{1}-{2}T22:00:00.000Z".format(this.state.year, this.state.month + 1, this.state.day);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ date: date })
        };
        fetch('http://localhost:3000/api/getTodosForDate', requestOptions)
            .then(res => res.json())
            .then(json => {
                if (json.data.length !== 0) {
                    this.setState({ todos: json.data });
                }
                else{
                    this.setState({ todos: [] });
                }

            })
            .catch(() => {
                console.log("error")
            })
    }



}

String.prototype.format = function () {
    var formatted = this;
    for (var arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

export default TodoCalender