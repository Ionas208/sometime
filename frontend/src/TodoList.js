import React from 'react';

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: props.data}
    }
    
    render(){
        return (<table><tbody>{this.createTodoTable()}</tbody></table>);
    }

    createTodoTable() {
        let table = [];
        table.push(
            <tr><td>Title</td><td>Description</td><td>Due Date</td></tr>
        );
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            table.push(<tr>
                <td>{this.state.data[i].title}</td>
                <td>{this.state.data[i].description}</td>
                <td>{this.state.data[i].duedate}</td>
            </tr>)
        }
        return table;
    }
}

export default TodoList