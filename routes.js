const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const List = mongoose.model("List", {
	name: {
		type: String
	},
	owner: {
		type: String
	}
});

const ListItem = mongoose.model("ListItem", {
	title: {
		type: String
	},
	details: {
		type: String
	},
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Unit",
		required: true
	}
});

router.post("/list", (req, res, next) => {
	List.create(req.body)
		.then(list => res.status(200).send(list))
		.catch(err => res.status(400).send(err));
});
router.get("/list", (req, res, next) => {
	List.find({})
		.then(lists => res.status(200).send(lists))
		.catch(err => res.status(400).send(err));
});
router.post("/listitem", (req, res, next) => {
	ListItem.create(req.body)
		.then(lists => res.status(200).send(lists))
		.catch(err => res.status(400).send(err));
});
router.get("/listitem", (req, res, next) => {
	ListItem.find({})
		.then(lists => res.status(200).send(lists))
		.catch(err => res.status(400).send(err));
});

module.exports = router;
