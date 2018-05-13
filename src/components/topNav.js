import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import botNav from'./botNav.js';
import topNav from './topNav.js';

import book from '../assets/book.png';
import homeicon from '../assets/home.png';
import market from '../assets/internet (1).png';
import history from '../assets/newspaper (1).png';
import menu from '../assets/menu.png';
import search from '../assets/search.png';

class home extends Component {
    constructor(props){
        super(props);
}


    render(){
        
        
        return ( 

                <div className = 'top' >

                <img src = {menu} />
                <span className = 'title' > Stock Tracker </span>
                <img src = {search} />

                </div>

                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(home)