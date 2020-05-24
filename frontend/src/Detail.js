
import React from 'react';
import TopBar from './TopBar';
import LeftBar from './LeftBar'
import Footer from './Footer'

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state =({data: [], mounted: false, hasSomething: false, date: null})
        this.createTodoTable = this.createTodoTable.bind(this);
    }

    render() {
        var toRender = [];
        toRender.push(<div className="detailHeadline">Your Tasks on the {this.state.date}: </div>)
        if(!this.state.mounted){
            toRender.push(<div></div>)
        }
        else{
            if(this.state.hasSomething){
                toRender.push(<div className="container">{this.createTodoTable()}</div>)
            }
            else{
                toRender.push(<div>All done!</div>)
            }
        }
        return(
        <div className="container">
            <TopBar/>
            <div className="containerForLeftBar">
                <LeftBar className="LeftBar" />
                <div className="container">
                {toRender}
                </div>
            </div>
            
            <Footer/>
        </div>);
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

    componentDidMount(){
        var datePart = this.props.match.params.date;
        var day = datePart[0]+""+datePart[1];
        var month = parseInt(datePart[2]+""+datePart[3]);
        var year = datePart[4]+""+datePart[5]+""+datePart[6]+""+datePart[7];

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
                    this.setState({data: json.data, hasSomething: true, mounted: true, date: date})
                }
                else{
                    this.setState({hasSomething: false, mounted: true, date: date})
                }

            })
            .catch((err) => {
                console.log(err.message)
            })

    }
}

export default Detail;