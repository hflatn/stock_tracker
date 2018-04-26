import React, { Component } from 'react';
import { connect } from 'react-redux';
import login from './login.css';

class log extends Component {
    constructor(props){
        super(props);
    
}


    render(){
        

        return ( 
            <div className = 'login-background' >

               
                <span className = 'login-title'> Stock Tracker </span> 
                

                
                <span className = 'login-description'> Manage your portfolio anywhere and everywhere </span>

                <div className ='login-title'>
                 <a className = 'login-register-button' href="http://localhost:3111/auth/callback"> Login / Register  </a> 
                </div>

                </div>
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(log)