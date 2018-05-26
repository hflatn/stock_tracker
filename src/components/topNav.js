import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from '../assets/menu.png';
import axios from 'axios';

class topNav extends Component {
    constructor(props){
        super(props);
}



    render(){
        
        
        return ( 

                <div className = 'top' >

                 <a href="https://first-tenny.auth0.com/v2/logout?returnTo=http://localhost:3000/#/">   <img src = {menu} /> </a>
                <span className = 'title' > Stock Tracker </span>
               

                </div>

                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(topNav)