var requestRepo = require('../repo/requestsRepo.js');
var jwt = require('jsonwebtoken');
var moment=require('moment');
var randomstring = require("randomstring");

exports.login = function(req,res) {
	res.end("ham login");
}
exports.register = function(req,res) {
	var user=req.body;
	user.RefreshToken=createRefreshToken();
	user.ID_Roles=1;
	requestRepo.register(user)
	.then(rows=>{
		res.json({
				statusCode:1,
				message:"register susscess!"
			});
	})
	.catch(err=>{
		res.json({
				statusCode:1,
				message:"register error!",
				error:err
			});
	});


}
var generateTokens = function(user) {
	var user_token={
		user:user
	}
	return token = jwt.sign(user_token, process.env.JWT_SECRET, {
        expiresIn: 60*60 // expires in 1 week
    });
}
var createRefreshToken=function(){
  var str=randomstring.generate({
    length: 50,
    charset: 'alphabetic'
});
  return str;
}
exports.insertRequests=function(req,res){
	var request=req.body;
	request.created_at=moment().unix();
	requestRepo.insertRequest(request)
	.then(rows=>{
			res.json({
				statusCode:1,
				message:"insert request susscess!"
			});
	})
	.catch(err=>{
		res.json({
			statusCode:0,
			message:"insert request error!",
			error:err
		});
	});
}
