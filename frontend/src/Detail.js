import React from 'react';
import TopBar from './TopBar';
import LeftBar from './LeftBar'
import Footer from './Footer'
import Menu from '@material-ui/core/Menu';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ data: [], mounted: false, hasSomething: false, date: null, anchorEl: null})
        this.createTodoTable = this.createTodoTable.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    render() {
        var toRender = [];
        toRender.push(<div className="detailHeadline">Your Tasks on the {this.state.date}: </div>)
                toRender.push(<div className="tableContainer">
                    <table className="todoListTable">
                        <thead>
                            <th>Title</th>
                            <th>Description</th>
                            <th className="plus" onClick={this.handleOpen}><i class="fas fa-plus"></i></th>
                            <Menu
                                className="addTaskMenu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <label>
                                            Title
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange}></input>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            Description:
                        <textarea value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                                        </label>
                                    </div>

                                    <input type="submit" value="Submit" />
                                </form>
                            </Menu>
                        </thead>
                        <tbody>{this.createTodoTable()}
                        </tbody>
                    </table>
                </div>)
            
        return (
            <div className="container">
                <TopBar />
                <div className="containerForLeftBar">
                    <LeftBar className="LeftBar" />
                    <div className="container">
                        {toRender}
                    </div>
                </div>

                <Footer />
            </div>);
    }

    createTodoTable() {
        let table = [];
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            table.push(<tr>
                <td>{this.state.data[i].title}</td>
                <td>{this.state.data[i].description}</td>
                <td className="check"><i class="fas fa-check" onClick={this.handleDone}><span className="hideThisShit">{this.state.data[i].todoid}</span></i></td>
            </tr>)
        }
        return table;
    }

    componentDidMount() {
        var datePart = this.props.match.params.date;
        var day = datePart[0] + "" + datePart[1];
        var month = parseInt(datePart[2] + "" + datePart[3]);
        var year = datePart[4] + "" + datePart[5] + "" + datePart[6] + "" + datePart[7];

        let date = "{0}-{1}-{2}T22:00:00.000Z".format(year, month + 1, day);
        console.log(date);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ date: date })
        };
        fetch('http://localhost:3000/api/getTodosForDate', requestOptions)
            .then(res => res.json())
            .then(json => {
                if (json.data != null && json.data.length !== 0) {
                    this.setState({ data: json.data, hasSomething: true, mounted: true, date: date })
                }
                else {
                    this.setState({ hasSomething: false, mounted: true, date: date })
                }

            })
            .catch((err) => {
                console.log(err.message)
            })

    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(event) {
        this.setState({ anchorEl: null });
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

    insertTodo(event) {
        let title = this.state.title;
        let description = this.state.description;
        var datePart = this.props.match.params.date;
        var day = datePart[0] + "" + datePart[1];
        var month = parseInt(datePart[2] + "" + datePart[3]);
        var year = datePart[4] + "" + datePart[5] + "" + datePart[6] + "" + datePart[7];

        let date = "{0}-{1}-{2}T22:00:00.000Z".format(year, month + 1, day);
        console.log(date)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({ duedate: date, title: title, description: description })
        };
        fetch('http://localhost:3000/api/createTodo', requestOptions);
    }
    handleDone(event){
        const todoid = ((event.currentTarget.children).item(0)).innerText;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({todoid: todoid})
        };
        fetch('http://localhost:3000/api/deleteTodo', requestOptions);
        window.location.reload(false); 
    }
}

export default Detail;