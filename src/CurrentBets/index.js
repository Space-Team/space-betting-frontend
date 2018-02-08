import React, { Component } from "react";
import "./style.css";
import { Button } from "antd";

const apiUrl = "http://localhost:3000/"

class CurrBetCard extends Component {
	constructor(props) {
		super(props);
		this.idToName = this.idToName.bind(this)
		this.iWon = this.iWon.bind(this)
		this.theyWon = this.theyWon.bind(this)
		this.putAttempt = this.putAttempt.bind(this)
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
								<Button className={bet.resolved ? "hidden" : ""} onClick={(e)=>{this.iWon(e, bet)}}>I Won</Button>
								<Button className={bet.resolved ? "hidden" : ""} onClick={(e)=>{this.theyWon(e, bet)}}>They Won</Button>
								<Button className={bet.resolved ? "hidden" : ""}>Wash</Button>
							</div>
						</div>
					);
				}
			});
		});
	}
}

export default CurrBetCard;
