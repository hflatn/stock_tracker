import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist, newquantity } from "./../reducer.js";
import { Line } from 'react-chartjs-2';

class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerName: '',
            invalid: '',
            stockGraph: '',
            data: null,
        }
    }
    
    componentDidMount() {

    }

    searchStock() {
        const { tickerName, tickerQuantity } = this.state;
        let body = { tickerName, tickerQuantity };
        axios.get(`https://api.iextrading.com/1.0/stock/${tickerName}/chart/1d`).then(res => {
            let z = Object.entries(res.data)
            let p =[]
            let i = 0;
            for (i=0; i < z.length; i++){ 
                if((z[i][1].average != 1) && (z[i][1].average != -1)){
                    p.push(z[i])
                }}
            var datapoints = []
            var datalabels = []
            for (i=0; i < p.length; i++){
                datalabels.push(p[i][1].label)
                datapoints.push(p[i][1].average)
            }
        
            console.log(datapoints, "whats datapoints?")
            if (z[0]) {
                this.setState({
                    invalid: '',
                    stockGraph: z,
						data: {
							labels: datalabels,
							datasets: [{
                                data: datapoints ,
                                label: this.state.tickerName,
								borderColor: "#77C9D4",
							
                            },{
                            pointRadius: 0
                            }]
						}
                })
                console.log(z[0][1].label, this.state.data.labels)

            } else {
                this.setState({
                    invalid: 'Invalid Symbol'
                })
            }
        })
    }

    tickerListener(e) {
        this.setState({
            tickerName: e.toUpperCase()
        });
    }


    render() {
        console.log(this.state.stockGraph, "stockGraph state")

        

        return (
            <div className="search">
                <div className="main">
                    <TopNav />

                    <input className="searchinput" placeholder="Symbol"
                        onChange={e => this.tickerListener(e.target.value)} />
                    <button className="searchbutton" onClick={() => this.searchStock()}> > </button>
                    {this.state.invalid}
                    {this.state.data != null ?
                    <Line data={this.state.data} /> :
                    "" }
                </div>

                <BotNav />
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    const { userstockstring, userstockliststring, newquantitystring } = state;
    return {
        userstockstring,
        userstockliststring,
        newquantitystring
    };
}


export default connect(mapStateToProps, { userstock, userstocklist, newquantity })(search);