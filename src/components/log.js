import React, { Component } from 'react';
import { connect } from 'react-redux';


class log extends Component {
    constructor(props){
        super(props);
    
}


    render(){
        

        return ( 
            <div className = 'login' >

               
                <span className = 'title'> Stock Tracker </span> 
                

                
                <span className = 'description'> Manage your portfolio anywhere and everywhere </span>

                <div className ='title'>
                 <a className = 'register-button' href={process.env.REACT_APP_LOGIN}> Login / Register  </a> 
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