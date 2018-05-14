import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
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