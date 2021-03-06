import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist, newquantity, url } from "./../reducer.js";
import { Line } from 'react-chartjs-2';
import Arrow from 'react-icons/lib/fa/arrow-right.js';

class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerName: '',
            invalid: null,
            stockGraph: '',
            data: null,
            tickerQuote: 'N/A'
        }
    }

    componentDidMount() {
        this.props.url(this.props.location)
    }

    searchStock(g) {
        console.log(g, "whats g?")
        const { tickerName } = this.state;
        let body = { tickerName };
        console.log(tickerName)
        axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${tickerName}`).then(res => {
            let newres = Object.entries(res.data)
            console.log(newres, "whats res.data for quote")

            if(newres[0]){
            this.setState({
                tickerQuote: newres[0][1].quote
            })
        } else {
            this.setState({
                invalid: 'Invalid Symbol'
        })}
        })

        axios.get(`https://api.iextrading.com/1.0/stock/${tickerName}/chart/${g}`).then(res => {
            console.log(res.data, "whats res.data of 2nd axios request")
            let z = Object.entries(res.data)
            let p = []
            let i = 0;
            console.log(z, "whats in z/?")
            for (i = 0; i < z.length; i++) {



                if (g === '1d') {
                    if ((z[i][1].average !== 1) && (z[i][1].average !== -1)) {
                        p.push(z[i])
                    }
                }
                else if (g === '1m') {
                    p.push(z[i])

                }

                else if (g === '3m') {
                    if ((i % 1 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '6m') {
                    if ((i % 1 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '1y') {
                    if ((i % 2 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '2y') {
                    if ((i % 4 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '5y') {
                    if ((i % 10 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === 'ytd') {
                    if ((i % 1 === 0) || (i === z.length - 1)) {
                        p.push(z[i])
                    }
                }
            }





            var datapoints = []
            var datalabels = []

            if (g === '1d') {
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
            console.log(z, "whats z?")
            if (z[0]) {
                let posorneg = "black"
                if (datapoints[0] < datapoints[datapoints.length - 1]) {
                    posorneg = "#77d4b1"
                } else {
                    posorneg = "#d48277"
                }

                this.setState({
                    invalid: '',
                    stockGraph: z,
                    data: {
                        labels: datalabels,
                        datasets: [{
                            data: datapoints,
                            label: this.state.tickerQuote.companyName,
                            borderColor: posorneg,
                            pointRadius: 0.5,
                            pointHitRadius: 10
                        }]

                    },

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
        const { tickerQuote, invalid, stockGraph, data } = this.state
        console.log(stockGraph, "stockGraph state")
        console.log(invalid, "whats invalid?")
        console.log(tickerQuote, "whats tickerquote")


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
                    <button className="searchbutton" onClick={() => this.searchStock("1d")}> <Arrow size={12}/> </button>
                    <span className='invalid'> {invalid} </span> 
                    {data != null ?
                        <Line data={data} />
                        :
                        <Line data={oldData}  />}

                    <button className="stocktime" onClick={() => this.searchStock("1d")}> 1D </button>
                    <button className="stocktime" onClick={() => this.searchStock("1m")}> 1M </button>
                    <button className="stocktime" onClick={() => this.searchStock("3m")}> 3M </button>
                    <button className="stocktime" onClick={() => this.searchStock("6m")}> 6M </button>
                    <button className="stocktime" onClick={() => this.searchStock("1y")}> 1Y </button>
                    <button className="stocktime" onClick={() => this.searchStock("2y")}> 2Y </button>
                    <button className="stocktime" onClick={() => this.searchStock("5y")}> 5Y </button>
                    <button className="stocktime" onClick={() => this.searchStock("ytd")}> YTD </button>


                    <div className='stockdetailsC'>
                        {tickerQuote !== null ?
                            <div className='stockdetailsCC'>
                                <div className='stockdetailsleft'>
                                    <span>  Open: {tickerQuote.open} </span>
                                    <span>  High: {tickerQuote.high} </span>
                                    <span>  Close: {tickerQuote.close} </span>
                                </div>
                                <div className='stockdetailsright'>
                                    <span>  Previous Close: {tickerQuote.previousClose} </span>
                                    <span>   52-Week High: {tickerQuote.week52High} </span>
                                    <span>    52-Week Close: {tickerQuote.week52Low} </span>
                                </div>
                            </div>
                            : ''}
                    </div>


                </div>

                <BotNav />
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    const { userstockstring, userstockliststring, newquantitystring, url } = state;
    return {
        userstockstring,
        userstockliststring,
        newquantitystring,
        url
    };
}


export default connect(mapStateToProps, { userstock, userstocklist, newquantity, url })(search);