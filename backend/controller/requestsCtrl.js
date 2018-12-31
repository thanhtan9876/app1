var requestRepo = require('../repo/requestsRepo.js');
var jwt = require('jsonwebtoken');
var moment=require('moment');
require('dotenv').config();
var randomstring = require("randomstring");

var arr=[];
exports.checkAccessToken = function(req,res,next){
	var c=req.body;
	var token=req.body.accessToken;
	var ref_token=req.body.refreshToken.toString();
	if(token){
		jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
			if(err){
				if(err.message==='jwt expired')
				{
					arr.push(token);
					var kt=arr.indexOf(token);
					if(kt>=0){
						requestRepo.getUserByToken(ref_token)
						.then(rows=>{
							var users=rows[0]
							var newToken=generateTokens(rows[0]);
							users.newToken=newToken;
							req.user_token=users;
							next();
						})
						.catch(erro=>{
							res.json({
								statusCode:0,
								message:erro
							});
						})
					}else{
						res.json({
								statusCode:0,
								message:"jwt expired"
							});
					}
				}else
				{
					res.json({
						statusCode:0,
						message:err
					});
				}
			}else
			{
				req.user_token=user;
				next();
			}
		})
	}

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
