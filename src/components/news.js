import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BotNav from "./botNav.js";
import TopNav from "./topNav.js";
import { userstock, url } from "./../reducer.js";
import SeekingAlpha from '../assets/Seeking-Alpha.jpg';
import CNBC from '../assets/CNBC.png';
import BusinessWire from '../assets/business_wire.jpg';
import Arrow from 'react-icons/lib/fa/arrow-right.js'

class news extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsInfo: null
        };
    }

    componentDidMount() {
        this.props.url(this.props.location)
        const { userstockstring } = this.props
        if (!userstockstring) {
            axios.get("/api/getstocks").then(res => {
                console.log(res.data, "user stock data");
                this.props.userstock(res.data);
                console.log(userstockstring, "whats userstockstring?")
                this.getNews()
            })
        }

        else {
            this.getNews()
        }


    }

    getNews() {
        const { userstockstring } = this.props
        let newsSymbol = []
        let i = 0;
        let j = 0;
        let newsStuff = [];
        if (userstockstring) {
            for (i = 0; i < userstockstring.length; i++) {
                newsSymbol.push(userstockstring[i].symbol)
            }
            console.log(newsSymbol, "whats newssymbol after for loop ")
            axios.get(`https://api.iextrading.com/1.0/stock/market/batch?types=news&symbols=${newsSymbol}`).then(res => {
                var p = Object.entries(res.data)
                console.log(p, "p res.data")
                for (i = 0; i < p.length; i++) {
                    for (j = 0; j < p[i][1].news.length; j++) {
                        newsStuff.push(p[i][1].news[j])
                    }
                }
                console.log(newsStuff, "newstuff before shuffle")
                let q = newsStuff.length, w, temp
                while (--q > 0) {
                    w = Math.floor(Math.random() * (q + 1));
                    temp = newsStuff[w]
                    newsStuff[w] = newsStuff[q]
                    newsStuff[q] = temp
                }



                console.log(newsStuff, "whats newstuff after looping?")
                this.setState({
                    newsInfo: newsStuff
                })

            })
        }
    }

    render() {
        const { newsInfo } = this.state
        console.log(this.props, "whats props?")
        console.log(this.state.newsInfo, "whats in newsinfo?")
        if (this.state.newsInfo != null) {
            var displayNews = newsInfo.map((list, index) =>
                <ul key={index} className='NewsContainer'>
                    <div className="stockBox">
                        {list.source == "SeekingAlpha" ?
                            <img className="imgsource" src={SeekingAlpha} /> :
                            ""}
                        {list.source == "Business Wire" ?
                            <img className="imgsource" src={BusinessWire} /> :
                            ""}
                        {list.source == "CNBC" ?
                            <img className="imgsource" src={CNBC} /> :
                            ""}

                        <p className='HeadlineContainer'> {list.headline} </p>
                        <a className='ReadMoreContainer' href={list.url}> 
                       <span className='ReadMore'> Read more </span>
                       <div> <Arrow size={15}/> </div>
                         </a>

                    </div>
                </ul>
            )
        }

        return (
            <div className="home">
                <div className="main">
                    <TopNav />

                    {displayNews}
                </div>

                <BotNav />
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state) return {};
    const { userstockstring, url } = state;
    return {
        userstockstring, url
    };
}


export default connect(mapStateToProps, { userstock, url })(news);