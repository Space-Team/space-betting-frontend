import React, { Component } from "react"
import { Button, Modal } from "antd"
import "./style.css"

const apiUrl = "https://planet-wager.herokuapp.com/"

class BetCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acceptModalIsOpen: false
    }

    this.openAcceptModal = this.openAcceptModal.bind(this)
    this.closeAcceptModal = this.closeAcceptModal.bind(this)
  }

  componentDidMount() {
    this.props.users.filter(item => {
      return this.props.bet.creator === item.id
    })
    this.forceUpdate()
  }

  openAcceptModal() {
    if (window.sessionStorage.length === 0) {
      window.location.href = "/login"
    } else {
      this.setState({ acceptModalIsOpen: true })
    }
  }

  closeAcceptModal() {
    this.setState({ acceptModalIsOpen: false })
  }

  takeMyBucks(id, amount) {
    const calcedsb = this.props.currentUser.spacebucks - amount
    const sb2Submit = { spacebucks: calcedsb }
    fetch(apiUrl + "users/" + id, {
      method: "PUT",
      body: JSON.stringify(sb2Submit),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
      .then(res => {
      this.props.getUsers()})
      .then(res => {this.props.getBets()})
      .catch(error => console.error("Error:", error))
  }

  takeTheirBucks(name, amount) {
    var creatorId
    var userBucks
    this.props.users.forEach(user => {
      if (user.name === name) {
        creatorId = user.id
        userBucks = user.spacebucks
      }
    })
    var calcedsb = userBucks - amount
    var sb2Submit = { spacebucks: calcedsb }

    fetch(apiUrl + "users/" + creatorId, {
      method: "PUT",
      body: JSON.stringify(sb2Submit),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
      .catch(error => console.error("Error:", error))
  }

  handleOk = e => {
    e.preventDefault()
    const bet = this.props.bet
    const objToSubmit = {
      accepted: true,
      acceptor: Number(window.sessionStorage.id)
    }
    this.props.putAcceptance(objToSubmit, this.props.bet.id)
    this.takeMyBucks(window.sessionStorage.id, bet.amount)
    this.takeTheirBucks(bet.name, bet.amount)
    this.setState({
      acceptModalIsOpen: false
    })
  }

  render() {
    return (
      <div className="betcard">
        <main className="maincard">
          <p className="gridcol1">{this.props.bet.amount}</p>
          <p className="gridcol2 cardname">{this.props.bet.description}</p>
          <p className="gridcol3">{this.props.bet.name}</p>
          <Button
            className="gridcol4"
            onClick={this.openAcceptModal}
            type="primary"
          >
            Accept
          </Button>
        </main>

        <Modal
          title="Confirm Bet"
          onOk={this.handleOk}
          visible={this.state.acceptModalIsOpen}
          contentLabel="Accept Modal"
          onCancel={this.closeAcceptModal}
        >
          <p id="modalator">
            Are you sure you sure you want to bet {this.props.bet.name}{" "}
            {this.props.bet.amount} spacebucks?
          </p>
        </Modal>
      </div>
    )
  }
}

export default BetCard
