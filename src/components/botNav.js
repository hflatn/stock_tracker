import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import book from '../assets/book.png';
import homeicon from '../assets/home.png';
import market from '../assets/internet (1).png';
import history from '../assets/newspaper (1).png';


class botNav extends Component {
    constructor(props){
        super(props);
}


    render(){
        
        
        return ( 
          

                <div className = 'nav'>
               
                <img src = {homeicon} />
                <img src = {book} />
                <img src = {history} />
                <img src = {market} />

                </div>
                

        
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(botNav)