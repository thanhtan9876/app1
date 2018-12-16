var requestRepo = require('../repo/requestsRepo.js');
var jwt = require('jsonwebtoken');
var moment=require('moment');
exports.login = function(req,res) {
	res.end("ham login");
}
exports.register = function(req,res) {
	res.end("ham register");
}
var generateTokens = function(user) {
    var user_token={
        user:user
    }
    return token = jwt.sign(user_token, process.env.JWT_SECRET, {
        expiresIn: 60*20 // expires in 1 week
    });
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
