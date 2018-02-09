import React, { Component } from "react";
import "./style.css";
import { Button, Icon } from "antd"
import CreatorList from "./CreatorList"
import AcceptorList from "./AcceptorList"


const apiUrl = "https://planet-wager.herokuapp.com/"

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
		.then(response => response.json())
		.then(response => {this.props.getUsers()})
		.then(response => {this.props.getBets()})
		.then(response => {this.props.getSB()})


		console.log(e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[1].textContent)

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
		.then(response => {this.props.getUsers()})
		.then(response => {this.props.getBets()})
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
				<h2>Bets I Created</h2>
				<CreatorList
					getSB={this.props.getSB}
					currentBets={this.props.currentBets}
					idToName={this.idToName}
					iWon={this.iWon}
					theyWon={this.theyWon}
					putAttempt={this.putAttempt}
					washOut={this.washOut}
					collect={this.collect}
					/>
				<h2>Bets I Accepted</h2>
				<AcceptorList
					getSB={this.props.getSB}
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
