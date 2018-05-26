import React from "react";
import { connect } from "react-redux";
import { ListActions } from "../redux/store";

@connect(state => {
	return {
		list: state.list
	};
}, null)
export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			details: ""
		};
	}
	setTitle = evt => {
		this.setState({ title: evt.target.value });
	};
	setDetails = evt => {
		this.setState({ details: evt.target.value });
	};
	createList = () => {
		if (this.state.title && this.state.details) {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "/api/list", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					this.props.dispatch(ListActions.create(JSON.parse(xhr.responseText)));
					location.href = "#/";
				} else if (
					xhr.readyState === XMLHttpRequest.DONE &&
					xhr.status !== 200
				) {
					return reject(xhr.responseText);
				}
			};
			xhr.send(
				JSON.stringify({ title: this.state.title, details: this.state.details })
			);
		}
	};

	render() {
		return (
			<div className="list-create-wrapper">
				<h1>List-create</h1>
				<label>Title</label>
				<input type="text" value={this.state.title} onChange={this.setTitle} />
				<br />
				<label>Description</label>
				<input
					type="text"
					value={this.state.details}
					onChange={this.setDetails}
				/>

				<button onClick={this.createList}>Create</button>
			</div>
		);
	}
}
