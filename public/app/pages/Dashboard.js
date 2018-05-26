import React from "react";
import { connect } from "react-redux";

@connect(
	state => {
		return {
			list: state.list,
			listitem: state.listitem
		};
	},
	null // bind dispatch to this.props
)
export default class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<h1>Dash</h1>
				<a href="#/list/create">Create New</a>
				<p>Lists: {this.props.list.lists.length}</p>
				{this.props.list.lists.map(l => listDisplay(l))}
			</div>
		);
	}
}

const listDisplay = list => {
	return (
		<div key={list._id} className="list-display-item">
			<a href={"#/list/view/" + list._id}>
				{list.title} - {list.details}
			</a>
		</div>
	);
};
