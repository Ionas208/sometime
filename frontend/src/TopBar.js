import React from 'react';
import { Redirect } from 'react-router-dom'
import UserCard from './UserCard'
import Menu from '@material-ui/core/Menu';
import Logo from './Logo'

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {anchorEl: null, redirect: false};
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogoClick = this.handleLogoClick.bind(this);
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        else{
            return (
                <div className='topbar'>
                    <div className="logoContainer" onClick={this.handleLogoClick}>
                    <Logo/>
                    </div>
                    <div className='userIconTopBar' >
                        <div onClick={this.handleOpen}>
                            <i className="fas fa-user"></i>
                        </div>
    
                    </div>
                    <Menu
                        className="userIconMenu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <UserCard />
                    </Menu>
                </div>);
        }
    }

    handleLogoClick(event){
        let url = window.location.href;
        if(!url.split("/")[3]==""){
            this.setState({redirect: true});
        }
        
    }

    handleOpen(event) {
        console.log(event.currentTarget)
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose(event) {
        this.setState({ anchorEl: null })
    }
}



export default TopBar
