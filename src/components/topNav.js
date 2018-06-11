import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from '../assets/menu.png';
import axios from 'axios';
import Sign from 'react-icons/lib/fa/sign-out';

class topNav extends Component {
    constructor(props){
        super(props);
}



    render(){
        
        
        return ( 

                <div className = 'top' >
                <p className = 'title' > Stock Tracker </p>
                
                <div className='logout'> <a href="https://first-tenny.auth0.com/v2/logout?returnTo=http://localhost:3000/#/">   <Sign color={'black'} size={35} /> </a> </div>
               

                </div>

                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(topNav)