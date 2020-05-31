import React from 'react';
import { Redirect } from 'react-router-dom'
import UserCard from './UserCard'
import Menu from '@material-ui/core/Menu';

class Logo extends React.Component {
    render() {
        return (
            <div className='logo'>
                <div><span className="logoPart1">some</span><span className="logoPart2">time</span></div>
            </div>);
    }
}



export default Logo;
