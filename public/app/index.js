// 3rd part dependencies
import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { Store } from "./redux/store";

import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import ListCreate from "./pages/List-Create";

render(
	<HashRouter>
		<Provider store={Store}>
			<div>
				<div className="page-content-wrapper" id="page-content-wrapper">
					<Route path="/" exact component={Dashboard} />
					<Route path="/list/create" component={ListCreate} />
					<Route path="/list/view/:id" component={List} />
				</div>
			</div>
		</Provider>
	</HashRouter>,
	document.getElementById("app-mount")
);

// kinda hacky method for forcing mobile responsiveness
// will have to add a class to #page-content-wrapper inside of the topbar/sidebar which is not ideal
(function setupMobileDisplay() {
	/*	var mobilePage = document.getElementById('page-content-wrapper');
	var mobileClose = document.getElementById('mobile-close');
	mobileClose.addEventListener('click', function() {
		if(mobilePage.classList.contains('display-page-mobile')){
			mobilePage.classList.remove('display-page-mobile');
		}
	});*/
})();
