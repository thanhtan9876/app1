var conn=require('../database/connect')
var md5=require('crypto-js/md5')

exports.insertRequest = function(requests) {
	var sql = `insert into requests(GuestName,GuestTelephone,NameLocation,created_at) values('${requests.GuestName}','${requests.GuestTelephone}','${requests.NameLocation}',${requests.created_at})`;
	console.log(sql);
	return conn.load(sql);
}
exports.register = function(user) {
	var sql = `insert into users(Username,Password,RefreshToken,ID_Roles) values('${user.Username}','${user.Password}','${user.RefreshToken}',${user.ID_Roles})`;
	console.log(sql);
	return conn.load(sql);
}