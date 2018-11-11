import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist, newquantity, newsymbol, piedata, url, resets } from "./../reducer.js";
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import binoculars from '../assets/binoculars.png';
import Arrow from 'react-icons/lib/fa/arrow-right.js';

class home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			invalid: ''
		};
	}

	componentDidMount() {
		this.props.url(this.props.location)
		if (!this.props.userstockliststring) {
			this.getStocks()
		}
	}

	getStocks() {
		axios.get("/api/getstocks").then(res => {
			
			this.props.userstock(res.data);
			;
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
					console.log(this.props.userstockliststring, userstockstring, "whats the prob")
					for (i = 0; i < userstockstring.length; i++) {
						pieval.push(userstockstring[i].quantity * this.props.userstockliststring[i][1].quote.latestPrice)
						pielabels.push(userstockstring[i].symbol)
						piecolors.push("#" + Math.floor(Math.random() * 16777215).toString(16))
						console.log(pieval, pielabels, piecolors, "whats in pieval?")
					}
					
					this.props.piedata({
						labels:  pielabels,
						datasets: [{
							data: pieval,
							backgroundColor: piecolors,
							hoverBackgroundColor: piecolors
						}]
					})



				});
		})
			.catch(err => {
				console.log(err, "get stocks erro");
			});
	}




	addStock() {
		const { newsymbolstring, newquantitystring } = this.props;
		let body = { newsymbolstring, newquantitystring };
		console.log(newsymbolstring, newquantitystring, "propsssssssssssssssssssssssssssssss")
		axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${newsymbolstring}`).then(res => {
			let z = Object.entries(res.data)
			console.log(z, "addstock res.data")
			this.props.resets()
			if (z[0]) {
				axios.post("/api/addstock", body).then(res => {
					if (res.data) {
						this.getStocks()
						// this.setState({
						// 	invalid: ""
						// })
						console.log("success!!!");
					} else {
						this.setState({
							invalid: "Stock Already Listed"
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

	

	


	render() {
		const { userstockstring, userstockliststring, newquantitystring, newquantity, newsymbol, newsymbolstring } = this.props;
		console.log(this.props, "whats params?")
		console.log(userstockliststring)

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
						

						<div className="stockBoxLeft">
							<h1> {list[1].quote.symbol} </h1>
							<h2> {list[1].quote.companyName} </h2>
						</div>{/* <button onClick={() => this.stockDelete(list[1].quote.symbol)}> Delete </button> */}
						{/* <button onClick={() => this.stockUpdate(list[1].quote.symbol)}> Update </button> */}
						{/* <input onChange={(e) => newquantity(e.target.value)} /> */}

						<div className="stockBoxRight">
							<span className='latestPrice'> ${list[1].quote.latestPrice} </span>
							{list[1].quote.change > 0.00 ?
							<span className='latestChangePos'> {list[1].quote.change}%  </span> :
							<span className='latestChangeNeg'> {list[1].quote.change}%  </span>
							}
						</div>


						<Link to={`/usersymbol/${list[1].quote.symbol}`} className='stockBoxBottom'>	
					

							<span className='MoreStats'> More Stats </span>
							<div> <Arrow size={15}/> </div>
				
						</Link>
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
							onChange={e => newsymbol(e.target.value.toUpperCase())}
							value={newsymbolstring}
						/>
						<input
							className="addstock"
							placeholder="Quantity"
							onChange={e => newquantity(e.target.value)}
							value={newquantitystring}
						/>
					</div>
					{this.state.invalid}


					{this.props.piedatastring != null ?
						<Pie data={this.props.piedatastring} options={options} /> :
						''
					}
					<div className="viewListContainer"> <img src={binoculars} /> <div className="viewList"> Watch List </div> </div>
					{displayStock}
				</div>

				<BotNav />
			</div>
		);
	}
}

function mapStateToProps(state) {
	if (!state) return {};
	const { userstockstring, userstockliststring, newquantitystring, piedatastring, newsymbolstring, urlstring } = state;
	return {
		userstockstring,
		userstockliststring,
		newquantitystring,
		piedatastring,
		urlstring,
		newsymbolstring
	};
}


export default connect(mapStateToProps, { userstock, userstocklist, newquantity, newsymbol, piedata, url, resets })(home);