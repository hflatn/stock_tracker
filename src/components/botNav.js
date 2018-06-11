import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeicon from '../assets/home.png';
import market from '../assets/internet (1).png';
import history from '../assets/newspaper (1).png';
import search from '../assets/search.png';
import { Link } from 'react-router-dom';
import { url } from "./../reducer.js";


class botNav extends Component {
    constructor(props){
        super(props);
}


    render(){
       console.log(this.props, " whats dat url?")
       
       var pathname = ''
       if (this.props.urlstring) {
           
           pathname = this.props.urlstring.pathname
        }
        console.log(pathname, "whats pathname")
       
        
        return ( 
          
            <div className = 'nav'>
            {pathname == "/home" ? 
            <div className = 'navboxselect'>   <Link to="/home">   <img src = {homeicon} />  </Link> </div> :
             <div className = 'navbox'>   <Link to="/home">   <img src = {homeicon} />  </Link> </div>}
            
            {pathname == "/news" ? 
            <div className = 'navboxselect'>   <Link to='/news'> <img src = {history} /> </Link> </div> :
            <div className = 'navbox'>   <Link to='/news'> <img src = {history} /> </Link> </div>}

            {pathname == "/market" ? 
            <div className = 'navboxselect'>   <img src = {market} /> </div> :
        <div className = 'navbox'>   <img src = {market} /> </div> }

            {pathname == "/search" ? 
            <div className = 'navboxselect' > <Link to="search"> <img src = {search} /> </Link> </div> :
        <div className = 'navbox' > <Link to="search"> <img src = {search} /> </Link> </div> }

                </div>
                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    const { urlstring } = state;
    return { urlstring }
}

export default connect(mapStateToProps, { url })(botNav)