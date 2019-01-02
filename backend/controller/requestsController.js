var requestRepo = require('../repo/requestsRepo.js');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var express = require('express');

var router = express.Router();

router.post('/insert', (req, res, next) => {
	var request = req.body;
	request.created_at = moment().unix();
	requestRepo.insertRequest(request)
		.then(value=>{
			console.log(value);
			res.json({
				id: value.insertId,
				message:"insert request succcess!"
			});
		})
		.catch(err=>{
			res.statusCode = 500;
			next(err);
		});
})

module.exports = router;
