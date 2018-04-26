import React, { Component } from 'react';
import { connect } from 'react-redux';
import hom from './hom.css';

class home extends Component {
    constructor(props){
        super(props);
    
}


    render(){
        

        return ( 
            <div>


                </div>
        )
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    return {}
}

export default connect(mapStateToProps, {})(home)