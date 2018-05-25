/* CREATE REDUX STORE
	 FIRE READ FUNCTIONS TO Preload stuff */
import { createStore, combineReducers } from "redux";

const listReducer = (state = [], action) => {
	console.log(action);
	return state;
};
const listItemReducer = (state = [], action) => {
	console.log(action);
	return state;
};
const rootReducer = combineReducers({ listReducer, listItemReducer });

//init store: each data type has array of items, status messages are an object
const store = createStore(rootReducer, {
	listReducer: {
		lists: []
	},
	listItemReducer: {
		listItems: []
	}
});

export default store;
