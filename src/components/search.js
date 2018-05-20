import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
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
            data: null
        }
    }

    componentDidMount() {
        
    }

    searchStock(g) {
        console.log(g, "whats g?")
        const { tickerName } = this.state;
        let body = { tickerName };
        axios.get(`https://api.iextrading.com/1.0/stock/${tickerName}/chart/${g}`).then(res => {

            let z = Object.entries(res.data)
            let p = []
            let i = 0;
            console.log(z, "whats in z/?")
            for (i = 0; i < z.length; i++) {



                if (g == '1d' ) {
                if ((i % 15 == 0) && (z[i][1].average != 1) && (z[i][1].average != -1) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }
            else if (g == '1m'){
                    p.push(z[i])
                
            }

            else if (g == '3m'){
                if ((i % 3 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }

            else if (g == '6m'){
                if ((i % 6 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }

            else if (g == '1y'){
                if ((i % 12 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }

            else if (g == '2y'){
                if ((i % 25 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }

            else if (g == '5y'){
                if ((i % 62 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }

            else if (g == 'ytd'){
                if ((i % 4 == 0) || (i == z.length -1)) {
                    p.push(z[i])
                }
            }
            }





            var datapoints = []
            var datalabels = []
            
            if ( g == '1d'){
            for (i = 0; i < p.length; i++) {
                datalabels.push(p[i][1].label)
                datapoints.push(p[i][1].average)
            }
        }
            else {
                for (i = 0; i < p.length; i++) {
                    datalabels.push(p[i][1].label)
                    datapoints.push(p[i][1].vwap)
            }
        }
            console.log(p, "whats p?")
            console.log(datapoints, "whats datapoints?")
            if (z[0]) {
                let posorneg = "black"
                if (datapoints[0] < datapoints[datapoints.length - 1]) {
                    posorneg = "green"
                } else {
                    posorneg = "red"
                }

                this.setState({
                    invalid: '',
                    stockGraph: z,
                    data: {
                        labels: datalabels,
                        datasets: [{
                            data: datapoints,
                            label: this.state.tickerName,
                            borderColor: posorneg,

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
        console.log(this.state.invalid, "whats invalid?")
        
        var oldData = {
            labels: [],
            datasets: [{
                data: [],
                label: [],
                borderColor: [],

            }]
        }

        return (
            <div className="search">
                <div className="main">
                    <TopNav />

                    <input className="searchinput" placeholder="Symbol"
                        onChange={e => this.tickerListener(e.target.value)} />
                    <button className="searchbutton" onClick={() => this.searchStock("1d")}> > </button>
                    {this.state.invalid}
                    {this.state.data != null ?
                        <Line data={this.state.data} /> :
                        <Line data = {oldData} />}
                        <button className="stocktime" onClick={() => this.searchStock("1d")}> 1D </button>
                        <button className="stocktime" onClick={() => this.searchStock("1m")}> 1M </button>
                        <button className="stocktime" onClick={() => this.searchStock("3m")}> 3M </button>
                        <button className="stocktime" onClick={() => this.searchStock("6m")}> 6M </button>
                        <button className="stocktime" onClick={() => this.searchStock("1y")}> 1Y </button>
                        <button className="stocktime" onClick={() => this.searchStock("2y")}> 2Y </button>
                        <button className="stocktime" onClick={() => this.searchStock("5y")}> 5Y </button>
                        <button className="stocktime" onClick={() => this.searchStock("ytd")}> YTD </button>
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