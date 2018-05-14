import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import book from '../assets/book.png';
import homeicon from '../assets/home.png';
import market from '../assets/internet (1).png';
import history from '../assets/newspaper (1).png';
import { Link } from 'react-router-dom';


class botNav extends Component {
    constructor(props){
        super(props);
}


    render(){
       
        
        return ( 
          

                <div className = 'nav'>
          <div className = 'navboxselect'>   <Link to="/home">   <img src = {homeicon} />  </Link> </div>
            <div className = 'navbox'>   <img src = {book} /> </div>
            <div className = 'navbox'>    <img src = {history} /> </div>
            <div className = 'navbox'>   <img src = {market} /> </div>

                </div>
                

        
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(botNav)