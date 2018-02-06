import React, { Component } from "react"
import {BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Button } from "antd"
import BetCardsList from "../BetCardsList"
import PostBet from "../PostBet"

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    return (
        <div className="MainPage">
        <Router>
          <div className="something">
            <Link to="/post-bets">
              <Button className="navbtn" > Post a Bet </Button>
            </Link>
            <div className="Routes">
              <Route path="/post-bets" render={()=><PostBet/>} />
            </div>
          </div>
        </Router>
          <h2>Available Bets</h2>
          <div className="cardHeaders">
            <p>Amount</p>
            <p className="cardname">Description</p>
            <p>Creator</p>
          </div>
          <BetCardsList users={this.props.users} bets={this.props.bets} putAcceptance={this.props.putAcceptance} creatorBets={this.props.creatorBets}/>
        </div>
    )
  }
}

export default Main;
