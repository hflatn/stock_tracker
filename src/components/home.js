import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, userstocklist } from "./../reducer.js";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerName: "",
      tickerQuantity: []
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
        let userSymbols = userstockstring.map(userstockstring => {
          return userstockstring.symbol;
        });
        axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=quote,news&symbols=${userSymbols}`
          ) 
          .then(res => {
            console.log(res.data, "whats in res.data?")
      
              var p = Object.entries(res.data)

            this.props.userstocklist(p);
    
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
    axios.post("/api/checkstock", body).then(res => {
      if (!res.data[0]) {
        axios.post("/api/addstock", body).then(res => {
          console.log("success!!!");
        });
      }
    });
  }

  render() {
    const { userstockstring, userstockliststring } = this.props;
    console.log( userstockstring, userstockliststring, "whats in userstockstring/list?" );
    console.log(userstockliststring, "after looping");

    if(userstockliststring != null) {
    let i = 0;
    for(i=0; i < userstockliststring.length; i++){

    }
  }

    if (userstockliststring != null) {
    var displayStock = userstockliststring.map((list,index) => 
      <ul key = {index} className= "stockBoxContainer">
      
       <div className="stockBox"> 
         {list[1].quote.symbol} ${list[1].quote.latestPrice} {list[1].quote.change}% Shares:{userstockstring[index].quantity}
        </div>

      </ul>
  )
    }
    return (
      <div className="home">
        <TopNav />

        <div className="tip">
          <button className="addbutton" onClick={() => this.addStock()}> +
          </button>
          <input
            className="addstock"
            placeholder="Add Symbol"
            onChange={e => this.tickerListener(e.target.value)}
          />
          <input
            className="addstock"
            placeholder="Quantity"
            onChange={e => this.tickerQuantity(e.target.value)}
          />
        </div>

        <div className="main">
         <div className="viewListContainer">  <div className="viewList">Stock List</div> </div>
        {displayStock} 
        </div>

        <BotNav />
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state) return {};
  const { userstockstring, userstockliststring } = state;
  return {
    userstockstring,
    userstockliststring
  };
}

export default connect(mapStateToProps, { userstock, userstocklist })(home);