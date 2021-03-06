import React, { Component } from "react"
import { Button } from "antd"
import BetCardsList from "../BetCardsList"
import PostBet from "../PostBet"
import "./style.css"
import { Icon } from "antd"

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      betsToggle: false,
      successToggle: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.toggleSuccess = this.toggleSuccess.bind(this)
    this.getSpacebucks = this.getSpacebucks.bind(this)
  }

  toggleForm(e){
    e.preventDefault()
    if(window.sessionStorage.length === 0){
      window.location.href = "/login"
    } else {
      this.setState({betsToggle: !this.state.betsToggle})
      this.setState({successToggle: false})
    }
  }

  toggleSuccess(e){
    e.preventDefault()
    this.setState({successToggle: !this.state.successToggle})
    setTimeout(()=>{this.toggleForm(e)}, 3000)
  }

  getSpacebucks(){
    let sbs = 0
    this.props.users.forEach(user => {
      if (Number(window.sessionStorage.id) === user.id){
        sbs = user.spacebucks
      }
    })
    return sbs
  }

  render () {

    return (
        <div className="MainPage">
          <div className="place-bets-box">
            <Button id="post-button" className={this.state.betsToggle ? "navbtn hidden" : "navbtn"} onClick={this.toggleForm} size="large"> Create A Bet </Button>
            <PostBet id="post-bet-box" submitBet={this.props.submitBet} toggle={this.state.betsToggle} toggler={this.toggleForm} toggleSuccess={this.toggleSuccess}/>
            <p className={this.state.successToggle ? "success-message" : "hidden"}>You successfully made your bet! Now someone just has to accept it</p>
          </div>

          <div className={window.sessionStorage.length > 0 ? 'spacebucks' : 'spacebucks hidden'}>
            <p className='sbucksLabel' >Spacebucks:</p>
            <h2 id='spacebucksdiv'>{this.getSpacebucks()} <Icon type="rocket" /></h2>
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
            getBets={this.props.getBets}
            getUsers={this.props.getUsers}/>            
        </div>
    )
  }
}

export default Main;
