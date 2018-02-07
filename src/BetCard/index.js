import React, { Component } from 'react'
import { Button, Modal } from 'antd'

const apiUrl = "https://planet-wager.herokuapp.com/"

let creatorName = ''

class BetCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      acceptModalIsOpen: false,
    }

    this.openAcceptModal = this.openAcceptModal.bind(this);
    this.closeAcceptModal = this.closeAcceptModal.bind(this);
    }

  componentDidMount() {
    console.log("mounted")
    console.log("creatorName")
    console.log('props1', this.props)
    creatorName = this.props.users.filter(item => {
        return this.props.bet.creator === item.id
      })
    this.forceUpdate()
  }

  openAcceptModal() {
    if(window.sessionStorage.length === 0){
      window.location.href = "/login"
    } else {
      this.setState({acceptModalIsOpen: true})
    }
  }

  closeAcceptModal() {
    this.setState({acceptModalIsOpen: false});
  }

  takeMyBucks(id, amount){
    const calcedsb = this.props.currentUser.spacebucks - amount
    const sb2Submit = ({"spacebucks": calcedsb})
    console.log('sb', sb2Submit)
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
    .catch(error => console.error("Error:", error))
  }

  handleOk = (e) => {
  console.log(e);
  e.preventDefault()
  const bet = this.props.bet
  const objToSubmit = ({
    "accepted": true,
    "acceptor": Number(window.sessionStorage.id)
  })
  console.log('object to submit', objToSubmit)
  this.props.putAcceptance(objToSubmit, this.props.bet.id)
  this.takeMyBucks(window.sessionStorage.id, bet.amount)
  this.setState({
    acceptModalIsOpen: false,
  });
}

  render() {

    return (
      <div className="betcard">
        <main className="maincard">
          <p>{this.props.bet.amount}</p>
          <p className="cardname">{this.props.bet.description}</p>
          <p>{this.props.bet.name}</p>
          <Button onClick={this.openAcceptModal} type='primary'>Accept</Button>
        </main>

        <Modal
          title="Confirm Bet"
          onOk={this.handleOk}
          visible={this.state.acceptModalIsOpen}
          contentLabel="Accept Modal"
          onCancel={this.closeAcceptModal}>

          <p>Are you sure you sure you want to bet {this.props.bet.name} {this.props.bet.amount} spacebucks?</p>

        </Modal>

      </div>
    );
  }
}

export default BetCard;
