import React, { Component } from "react";
import "./style.css";
import { Button, Icon } from "antd"
import CreatorList from "./CreatorList"
import AcceptorList from "./AcceptorList"


const apiUrl = "http://planet-wager.herokuapp.com/"

class CurrBetCard extends Component {
	constructor(props) {
		super(props);
		this.idToName = this.idToName.bind(this)
		this.iWon = this.iWon.bind(this)
		this.theyWon = this.theyWon.bind(this)
		this.putAttempt = this.putAttempt.bind(this)
		this.washOut = this.washOut.bind(this)
		this.collect = this.collect.bind(this)
	}

	collect(e, bet, amount){
		e.preventDefault()
		var newAmount
		this.props.users.forEach(user => {
			if (user.id === bet.winner){
				newAmount = user.spacebucks + amount
			}
		})

		fetch(apiUrl + "users/" + bet.winner, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "Application/json"
			}),
			body: JSON.stringify({spacebucks: newAmount})
		})

		fetch(apiUrl + "bets/" + bet.id, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "Application/json"
			}),
			body: JSON.stringify({paid: true})
		})
	}

	idToName(id){
		if(this.props.users.length < 1){
			return <p>Waiting on data</p>
		}

		var name
		this.props.users.forEach(user => {
			if (user.id === id){
				name = user.name
			}
		})
		return name
	}

	iWon(e, bet){
		e.preventDefault()

		var clicker = window.sessionStorage.id

		if (clicker == bet.creator){
			this.putAttempt({creatorAttempt: clicker}, bet.id)
		} else if (clicker == bet.acceptor){
			this.putAttempt({acceptorAttempt: clicker}, bet.id)
		}
		e.target.parentNode.className = "hidden"
	}

	theyWon(e, bet){
		e.preventDefault()

		var clicker = window.sessionStorage.id

		if (clicker == bet.creator){
			this.putAttempt({creatorAttempt: bet.acceptor}, bet.id)
		} else if (clicker == bet.acceptor){
			this.putAttempt({acceptorAttempt: bet.creator}, bet.id)
		}
		e.target.parentNode.className = "hidden"
	}

	washOut(e, bet){
		e.preventDefault()

		var clicker = window.sessionStorage.id

		if (clicker == bet.creator){
			this.putAttempt({creatorAttempt: 1}, bet.id)
		} else if (clicker == bet.acceptor){
			this.putAttempt({acceptorAttempt: 1}, bet.id)
		}
		e.target.parentNode.className = "hidden"
	}

	putAttempt(sender, id){
		fetch(apiUrl + "bets/" + id, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(sender)
		})
		.then(response => response.json())
		.catch(console.error)
	}

	render() {

		if(this.props.users.length < 1){
			return(<p>Not yet</p>)
		}

		if(this.props.currentBets.lenth < 1){
			return(<p>Almost there</p>)
		}

		return(
			<div>
				<h3>Bets I Created</h3>
				<CreatorList
					currentBets={this.props.currentBets}
					idToName={this.idToName}
					iWon={this.iWon}
					theyWon={this.theyWon}
					putAttempt={this.putAttempt}
					washOut={this.washOut}
					collect={this.collect}
					/>
				<h3>Bets I Accepted</h3>
				<AcceptorList
					currentBets={this.props.currentBets}
					idToName={this.idToName}
					iWon={this.iWon}
					theyWon={this.theyWon}
					putAttempt={this.putAttempt}
					washOut={this.washOut}
					collect={this.collect}
					/>
			</div>
		)
	}
}

export default CurrBetCard;
