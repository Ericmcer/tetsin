/* CREATE REDUX STORE
	 FIRE READ FUNCTIONS TO Preload stuff */
import { createStore, combineReducers } from "redux";

const listReducer = (state = [], action) => {
	switch (action.type) {
		case "LIST_READ":
			state.lists = action.data || [];
			return state;
		default:
			return state;
	}
};
const listActions = {
	read: data => {
		return {
			type: "LIST_READ",
			data: data
		};
	}
};

const listItemReducer = (state = [], action) => {
	switch (action.type) {
		case "LISTITEM_READ":
			state.listItems = action.data || [];
			return state;
		default:
			return state;
	}
};
const listItemActions = {
	read: data => {
		return {
			type: "LISTITEM_READ",
			data: data
		};
	}
};
const rootReducer = combineReducers({ listReducer, listItemReducer });

const fetchData = model => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		let url = "/api/" + model;
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				return resolve(res);
			} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
				return reject(xhr.responseText);
			}
		};
		xhr.send();
	});
};

//init store: each data type has array of items, status messages are an object
const store = createStore(rootReducer, {
	listReducer: {
		lists: []
	},
	listItemReducer: {
		listItems: []
	}
});

// populate store
fetchData("list")
	.then(lists => store.dispatch(listActions.read(lists)))
	.catch(err => console.error(err));

fetchData("listitem")
	.then(listitems => store.dispatch(listItemActions.read(listitems)))
	.catch(err => console.error(err));

export default store;
