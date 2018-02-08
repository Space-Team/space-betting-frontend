import React, { Component } from "react";
import "./style.css";
import { Button } from "antd";

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

		var acceptor = "dodoo, nothings here.";

		return this.props.currentBets.map(bet => {
			return this.props.users.map(user => {
				if (bet.acceptor === user.id) {
					acceptor = user.name;
				}

				if (bet.creator === user.id) {
					return (
						<div className="currbets" key={bet.id}>
							<p>Created by: {user.name}</p>
							<p>Description: {bet.description}</p>
							<p>Accepted by: {acceptor}</p>
							<p className={bet.resolved ? "" : "hidden"}>{this.idToName(bet.winner)} won the bet!</p>
							<div className="">
								<Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='primary' onClick={(e)=>{this.iWon(e, bet)}}>I Won</Button>
								<Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='primary' onClick={(e)=>{this.theyWon(e, bet)}}>They Won</Button>
								<Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='primary' onClick={(e)=>{this.washOut(e, bet)}}>Wash</Button>
							</div>
							<Button className={bet.resolved && !bet.paid && bet.winner == window.sessionStorage.id ? "currentBetsBtns" : "hidden"} type="primary" onClick={(e)=>{this.collect(e, bet, bet.amount * 2)}}>Collect {bet.amount * 2} Spacebucks</Button>
							<Button className={bet.resolved && !bet.paid && bet.winner == 1 ? "currentBetsBtns" : "hidden"} type="primary" onClick={(e)=>{this.collect(e, bet, bet.amount)}}>Collect {bet.amount} Spacebucks</Button>
						</div>
					);
				}
			});
		});
	}
}

export default CurrBetCard;
