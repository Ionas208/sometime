import React from 'react';
import Menu from '@material-ui/core/Menu';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data, anchorEl: null, title: null, description: null, duedate: null, update: false }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(event) {
        this.setState({ anchorEl: null });
    }



    render() {
        return (
            <div className="tableContainer">
                <table className="todoListTable">
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th className="plus" onClick={this.handleOpen}><i class="fas fa-plus"></i></th>
                        <Menu
                            className="addTaskMenu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <div className="addMenu">
                                <h2 className="addHeadline">Add a new Task:</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="addInputContainer">
                                        <label>
                                            Title
                            <input className="addInput" type="text" value={this.state.title} onChange={this.handleTitleChange}></input>
                                        </label>
                                    </div>
                                    <div className="addInputContainer">
                                        <label>
                                            Description:
                            <textarea className="addTextArea" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                                        </label>
                                    </div>
                                    <div className="addInputContainer">
                                        <label>
                                            Due Date
                            <input className="addDate" type="date" value={this.state.duedate} onChange={this.handleDueDateChange}></input>
                                        </label>
                                    </div>
                                    <div id="divToCenter">
                                        <input className="addSubmit" type="submit" value="Submit" />
                                    </div>

                                </form>
                            </div>

                        </Menu>
                    </thead>
                    <tbody>{this.createTodoTable()}
                    </tbody>
                </table>
            </div>
        );

    }

    handleSubmit(event) {
        this.handleClose();
        this.insertTodo();
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDueDateChange(event) {
        this.setState({ duedate: event.target.value });
    }

    insertTodo(event) {
        let title = this.state.title;
        let description = this.state.description;
        let dueDate = this.state.duedate;
        let parts = dueDate.split("-");
        let year = parts[2];
        let month = parts[1];
        let day = parts[0];

        let date = "{0}-{1}-{2}T22:00:00.000Z".format(year, month, day);
        console.log(date)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ duedate: date, title: title, description: description })
        };
        fetch('http://localhost:3000/api/createTodo', requestOptions);
    }

    createTodoTable() {
        let table = [];
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            let parts = (this.state.data[i].duedate).split("-");
            let year = parts[0];
            let month = parts[1];
            let day = parseInt((parts[2].split("T"))[0]) + 1 + "";
            let currentdate = new Date();
            let currentYear = currentdate.getFullYear();
            let currentMonth = currentdate.getMonth() + 1;
            let currentDay = currentdate.getDate() + "";
            if (currentDay < 10) {
                currentDay = "0" + currentDay;
            }
            else {
                currentDay += "";
            }
            if (currentMonth < 10) {
                currentMonth = "0" + currentMonth;
            }
            else {
                currentMonth += "";
            }
            let dateString = day + "." + month + "." + year;
            if (year == currentYear && month == currentMonth && day == currentDay) {
                dateString = "today"
            }

            table.push(<tr className="todoTableRow">
                <td>{this.state.data[i].title}</td>
                <td>{this.state.data[i].description}</td>
                <td>{dateString}</td>
                <td className="check"><i class="fas fa-check" onClick={this.handleDone}><span className="hideThisShit">{this.state.data[i].todoid}</span></i></td>
            </tr>)
        }
        return table;
    }

    handleDone(event) {
        const todoid = ((event.currentTarget.children).item(0)).innerText;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ todoid: todoid })
        };
        fetch('http://localhost:3000/api/deleteTodo', requestOptions);
        window.location.reload(false);
    }
}

export default TodoList