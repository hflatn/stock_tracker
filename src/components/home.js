import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist, newquantity } from "./../reducer.js";
import { Pie } from 'react-chartjs-2';

class home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickerName: "",
			tickerQuantity: [],
			data: null,
			invalid: ''
		};
	}

	componentDidMount() {
		axios.get("/api/getstocks").then(res => {
			console.log(res.data, "user stock data");
			this.props.userstock(res.data);
			console.log(
				this.props.userstockstring,
				"whats in userstockstring didmount?"
			);
			const { userstockstring } = this.props;
			var userSymbols = userstockstring.map(userstockstring => {
				return userstockstring.symbol;
			});
			axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${userSymbols}`
			)
				.then(res => {
					console.log(res.data, "whats in res.data?")

					var p = Object.entries(res.data)

					this.props.userstocklist(p);


					let pieval = []
					let piestock = ''
					let pielabels = []
					let piecolors = []
					let i = 0;
					for (i = 0; i < userstockstring.length; i++) {
						pieval.push(userstockstring[i].quantity * this.props.userstockliststring[i][1].quote.latestPrice)
						pielabels.push(userstockstring[i].symbol)
						piecolors.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
						console.log(pieval, pielabels, piecolors, "whats in pieval?")
					}
					this.setState({
						data: {
							labels: pielabels,
							datasets: [{
								data: pieval,
								backgroundColor: piecolors,
								hoverBackgroundColor: piecolors
							}]
						}
					})


				});
		})
			.catch(err => {
				console.log(err, "get stocks erro");
			});
	}

	tickerListener(e) {
		this.setState({
			tickerName: e.toUpperCase()
		});
	}

	tickerQuantity(e) {
		this.setState({
			tickerQuantity: e
		});
	}

	addStock() {
		const { tickerName, tickerQuantity } = this.state;
		let body = { tickerName, tickerQuantity };
		axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${tickerName}`).then(res => {
			let z = Object.entries(res.data)
			console.log(z, "addstock res.data")
			if (z[0]) {
				axios.post("/api/checkstock", body).then(res => {
					if (!res.data[0]) {
						axios.post("/api/addstock", body).then(res => {
							this.setState({
								invalid: ""
							})
							console.log("success!!!");
						});
					} else {
						this.setState({
							invalid: "Ticker Symbol Already Listed"
						})
					}
				});
			}
			else {
				this.setState({
					invalid: "Invalid Ticker Symbol"
				})
			}
		})
	}

	stockDelete(symbol) {
		console.log(symbol, "stockDelete info symbol")
		axios.delete('/api/deletestock', { data: { stock_symbol: symbol } }).then(res => {
			console.log("Deleted Stock")
		})
	}

	stockUpdate(symbol) {
		const { newquantitystring } = this.props
		let body = { newquantitystring, symbol }
		axios.patch('/api/updatestock', body).then(res => {
			console.log("Updated Stock")
		})
	}


	render() {
		const { userstockstring, userstockliststring, newquantitystring, newquantity } = this.props;
		console.log(this.props.match.url, "whats params?")

		var options = {
			title: {
				display: true,
				text: 'Dollar Value of Shares by Symbol'
			}
		}

		if (userstockliststring != null) {
			var displayStock = userstockliststring.map((list, index) =>
				<ul key={index} className="stockBoxContainer">

					<div className="stockBox">
						<button onClick={() => this.stockDelete(list[1].quote.symbol)}> Delete </button>
						<button onClick={() => this.stockUpdate(list[1].quote.symbol)}> Update </button>
						<input onChange={(e) => newquantity(e.target.value)} />
						{list[1].quote.symbol} ${list[1].quote.latestPrice} {list[1].quote.change}% Shares:{userstockstring[index].quantity}
					</div>

				</ul>
			)
		}

		return (
			<div className="home">
			<div className="main">
				<TopNav />
				
				<div className="tip">
					<button className="addbutton" onClick={() => this.addStock()}> +
          </button>
					<input
						className="addstock"
						placeholder="Symbol"
						onChange={e => this.tickerListener(e.target.value)}
					/>
					<input
						className="addstock"
						placeholder="Quantity"
						onChange={e => this.tickerQuantity(e.target.value)}
					/>
				</div>
				{this.state.invalid}
				
					<div className="viewListContainer">  <div className="viewList">Stock List</div> </div>
					{this.state.data != null ?
						<Pie data={this.state.data} options={options} /> :
						''
					}
					{displayStock}
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


export default connect(mapStateToProps, { userstock, userstocklist, newquantity })(home);