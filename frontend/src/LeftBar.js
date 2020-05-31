import React from 'react';
import { Link } from 'react-router-dom'

class LeftBar extends React.Component {
    render() {
        return (
            <div className="LeftBarContainer">
                <div className="LeftBarContainer2">
                    <div className="LeftBarLink">
                        <Link to="/todo">Todo</Link>
                    </div>
                    <div className="LeftBarLink">
                        <Link to="/calender">Calender</Link>
                    </div>
                </div>


            </div>
        );
    }
}

export default LeftBar;