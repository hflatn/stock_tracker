import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import menu from '../assets/menu.png';
import search from '../assets/search.png';
import axios from 'axios';

class home extends Component {
    constructor(props){
        super(props);
}

destroy(){
    axios.get('/api/signout').then (res => {

    })
}

    render(){
        
        
        return ( 

                <div className = 'top' >

                 <a href="https://first-tenny.auth0.com/v2/logout?returnTo=http://localhost:3000/#/">   <img src = {menu} /> </a>
                <span className = 'title' > Stock Tracker </span>
               <Link to="search"> <img src = {search} /> </Link>

                </div>

                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(home)