var requestRepo = require('../repo/requestsRepo.js');

var moment=require('moment');
exports.login = function(req,res) {
	res.end("ham login");
}
exports.register = function(req,res) {
	res.end("ham register");
}
exports.insertRequests=function(req,res){
	var request=req.body;
	request.created_at=moment().unix();
	requestRepo.insertRequest(request)
	.then(rows=>{
		console.log("insert success!")
	})
	.catch(err=>{
        console.log("insert error!")
	});
}