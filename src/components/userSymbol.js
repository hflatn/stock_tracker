import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist, newquantity, url, resets } from "./../reducer.js";
import { Line } from 'react-chartjs-2';
import Delete from 'react-icons/lib/fa/archive';
import Update from 'react-icons/lib/fa/upload.js';


class userSymbol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerName: this.props.match.params.symbol,
            invalid: '',
            stockGraph: '',
            data: null,
            tickerQuote: 'N/A',
            shares: ''
        }
    }

    componentDidMount() {
        this.props.url(this.props.location)
        console.log(this.props.userstockliststring, " whats userstockliststring")
        console.log(this.props.match.params.symbol, 'whats this.props')
        this.searchStock('1d')
    }

    searchStock(g) {
        console.log(g, "whats g?")
        const { tickerName } = this.state;
        let body = { tickerName };
        console.log(tickerName)
        axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${tickerName}`).then(res => {
            let newres = Object.entries(res.data)
            console.log(newres, "whats res.data for quote")


            this.setState({
                tickerQuote: newres[0][1].quote
            })
        })

        axios.get(`https://api.iextrading.com/1.0/stock/${tickerName}/chart/${g}`).then(res => {

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
                    if ((i % 1 === 0) && (i !== z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '6m') {
                    if ((i % 1 === 0) && (i !== z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '1y') {
                    if ((i % 2 === 0) && (i !== z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '2y') {
                    if ((i % 4 === 0) && (i !== z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === '5y') {
                    if ((i % 10 === 0) && (i !== z.length - 1)) {
                        p.push(z[i])
                    }
                }

                else if (g === 'ytd') {
                    if ((i !== z.length - 1)) {
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

    getStocks() {
		axios.get("/api/getstocks").then(res => {
			console.log(res.data, "user stock data");
			this.props.userstock(res.data);
			console.log(
				this.props.userstockstring,
				"whats in userstockstring didmount?"
            )
        }
    )}
    

    stockDelete(symbol) {
		console.log(symbol, "stockDelete info symbol")
		axios.delete('/api/deletestock', { data: { stock_symbol: symbol } }).then(res => {
            console.log("Deleted Stock")
            this.props.history.push('/home')
            window.location.reload()
		})
    }
    
    stockUpdate(symbol) {
		const { newquantitystring, newquantity} = this.props
		let body = { newquantitystring, symbol }
		axios.patch('/api/updatestock', body).then(res => {
			console.log("Updated Stock")
            this.getStocks()
            this.props.resets()
           
		})
	}

    tickerListener(e) {
        this.setState({
            tickerName: e.toUpperCase()
        });
    }

    handleShares(e){
        let input = e.target.value
        this.setState({
           shares: input
        })
    }


    render() {
        const { tickerQuote, invalid, stockGraph, data } = this.state
        const {userstockstring, newquantity} = this.props
        console.log(stockGraph, "stockGraph state")
        console.log(userstockstring, "whats userstockstring")
        console.log(tickerQuote, "whats tickerquote")
        var shares = ''
        if(userstockstring){
        for(let i=0; i < userstockstring.length; i++){
            if(userstockstring[i].symbol === this.props.match.params.symbol ){
                shares = userstockstring[i].quantity
            }
        }
    }


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

                <div className='ButtonContainer'>
                <button className='StockUpdate' onClick={() => this.stockUpdate(this.props.match.params.symbol)}> Update <Update size={15}/> </button>
                <input className='UserSymbolQuantityInput' placeholder="Shares" value={this.props.newquantitystring} onChange={(e) => newquantity(e.target.value)} />
                    <button className='StockDelete' onClick={() => this.stockDelete(this.props.match.params.symbol) } > Remove <Delete color={'white'} size={15}/> </button>
                    </div>
                    
                    {invalid}
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
                            <div className='shares'> Shares: {shares}  </div>

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


export default connect(mapStateToProps, { userstock, userstocklist, newquantity, url, resets })(userSymbol);