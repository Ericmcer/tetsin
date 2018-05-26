/* CREATE REDUX STORE
	 FIRE READ FUNCTIONS TO Preload stuff */
import { createStore, combineReducers } from "redux";

const listReducer = (state = [], action) => {
	switch (action.type) {
		case "LIST_READ":
			return { ...state, lists: action.data };
		case "LIST_CREATED":
			state.lists = [...state.lists, action.data];
			return state;
		default:
			return state;
	}
};
const ListActions = {
	read: data => {
		return {
			type: "LIST_READ",
			data: data
		};
	},
	create: data => {
		return {
			type: "LIST_CREATED",
			data: data
		};
	}
};
const list = listReducer;

const listItemReducer = (state = [], action) => {
	switch (action.type) {
		case "LISTITEM_READ":
			return { ...state, listItems: action.data };
		case "LISTITEM_CREATED":
			state.listItems = [...state.listItems, action.data];
			return state;
		default:
			return state;
	}
};
const listItem = listItemReducer;
const ListItemActions = {
	read: data => {
		return {
			type: "LISTITEM_READ",
			data: data
		};
	},
	create: data => {
		return {
			type: "LISTITEM_CREATED",
			data: data
		};
	}
};
const rootReducer = combineReducers({ list, listItem });

const fetchData = model => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		let url = "/api/" + model;
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				return resolve(JSON.parse(xhr.responseText));
			} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
				return reject(xhr.responseText);
			}
		};
		xhr.send();
	});
};

//init store: each data type has array of items, status messages are an object
const Store = createStore(rootReducer, {
	list: {
		lists: []
	},
	listItem: {
		listItems: []
	}
});

// populate store
fetchData("list")
	.then(lists => Store.dispatch(ListActions.read(lists)))
	.catch(err => console.error(err));

fetchData("listitem")
	.then(listitems => Store.dispatch(ListItemActions.read(listitems)))
	.catch(err => console.error(err));

export { Store, ListItemActions, ListActions };
