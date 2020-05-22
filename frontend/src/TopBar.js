import React from 'react';
import { Redirect } from 'react-router-dom'
import UserCard from './UserCard'

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: true , redirect: false};
        this.handleOnLogoClick = this.handleOnLogoClick.bind(this);
        this.handleOnUserIconClick = this.handleOnUserIconClick.bind(this);
    }

    render() {
        if(this.state.redirect){
            return(<Redirect to='/' />);
        }
        else{
            if (this.state.showMenu) {
                return (
                    <div className='topbar'>
                        <div className='logo' onClick={this.handleOnLogoClick}>
                            <h1>sometime</h1>
                        </div>
                        <div className='userIconTopBar' onClick={this.handleOnUserIconClick}>
                            <i className="fas fa-user"></i>
                            <UserCard />
                        </div>
                    </div>);
            }
            else {
                return (
                    <div className='topbar'>
                        <div className='logo'>
                            <h1>sometime</h1>
                        </div>
                        <div className='userIconTopBar' onClick={this.handleOnUserIconClick}>
                            <i className="fas fa-user"></i>
                        </div>
                    </div>);
            }
        }
        
    }

    handleOnLogoClick(event){
        this.setState({redirect: true});
    }

    handleOnUserIconClick(event){
        if(this.state.showMenu){
            this.setState({showMenu: false})
        }
        else{
            this.setState({showMenu: true})
        }
        
    }
}



export default TopBar
