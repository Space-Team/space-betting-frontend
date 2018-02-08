import React, { Component } from "react"
import { Button } from "antd"
import BetCardsList from "../BetCardsList"
import PostBet from "../PostBet"
import "./style.css"

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      betsToggle: false,
      successToggle:false
    }
    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm(e){
    e.preventDefault()
    if(window.sessionStorage.length === 0){
      window.location.href = "/login"
    } else {
      this.setState({betsToggle: !this.state.betsToggle})
    }
  }

  render () {

    return (
        <div className="MainPage">
          <div className="place-bets-box">
            <Button id="post-button" className={this.state.betsToggle ? "navbtn hidden" : "navbtn"} onClick={this.toggleForm} size="large"> Create A Bet </Button>
            <PostBet id="post-bet-box" submitBet={this.props.submitBet} toggle={this.state.betsToggle} toggler={this.toggleForm}/>
            <p className={this.state.successToggle ? "success-message" : "hidden"}>You successfully made your bet! Now someone just has to accept it</p>
          </div>
          <h2>Available Bets</h2>
          <div className="cardHeaders">
            <p className="gridcol1 colheader">$$$</p>
            <p className="gridcol2 colheader cardname">Description</p>
            <p className="gridcol3 colheader">Creator</p>
          </div>
          <BetCardsList currentUser={this.props.currentUser}
            users={this.props.users}
            bets={this.props.bets}
            putAcceptance={this.props.putAcceptance}
            creatorBets={this.props.creatorBets}
            getBets={this.props.getBets}/>
        </div>
    )
  }
}

export default Main;
