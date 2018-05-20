import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeicon from '../assets/home.png';
import market from '../assets/internet (1).png';
import history from '../assets/newspaper (1).png';
import search from '../assets/search.png';
import { Link } from 'react-router-dom';


class botNav extends Component {
    constructor(props){
        super(props);
}


    render(){
       
        
        return ( 
          

                <div className = 'nav'>
            <div className = 'navboxselect'>   <Link to="/home">   <img src = {homeicon} />  </Link> </div>
            <div className = 'navbox'>   <Link to='/news'> <img src = {history} /> </Link> </div>
            <div className = 'navbox'>   <img src = {market} /> </div>
            <div className = 'navbox' > <Link to="search"> <img src = {search} /> </Link> </div>

                </div>
                
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(botNav)