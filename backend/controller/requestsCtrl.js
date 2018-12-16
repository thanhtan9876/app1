var requestRepo = require('../repo/requestsRepo.js');
var jwt = require('jsonwebtoken');
var moment=require('moment');
require('dotenv').config();
var randomstring = require("randomstring");

exports.login = function(req,res) {
	var c=req.body;
	requestRepo.login(c)
	.then(rows=>{
		if(rows.length>0)
		{
			var token=generateTokens(rows[0]);
			res.json({
				statusCode:1,
				message:"login susscess!",
				id:rows[0].ID,
				refreshToken:rows[0].RefreshToken,
				accessToken:token,
				username:rows[0].Username,
                ID_Roles:rows[0].ID_Roles
			});
		}
		else
		{
            res.json({
				statusCode:0,
				message:"username or password invalid!!"
			});
		}
	})
	.catch(err=>{
		console.log(err);
		res.json({
			statusCode:0,
			message:"login error!",
			error:err
		});
	});

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
