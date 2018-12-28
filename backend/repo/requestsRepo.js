var conn=require('../database/connect')
var md5=require('crypto-js/md5')

exports.insertRequest = function(requests) {
	var sql = `insert into requests(GuestName,GuestTelephone,NameLocation,Note,created_at) values('${requests.GuestName}','${requests.GuestTelephone}','${requests.NameLocation}','${requests.Note}',${requests.created_at})`;
	console.log(sql);
	return conn.load(sql);
}
exports.register = function(user) {
	var md5_pws=md5(user.Password);
	var sql = `insert into users(Username,Password,RefreshToken,ID_Roles) values('${user.Username}','${md5_pws}','${user.RefreshToken}',${user.ID_Roles})`;
	console.log(sql);
	return conn.load(sql);
}
exports.login = function(c) {
	var md5_pws=md5(c.Password);
	var sql = `select * from users where Username = '${c.Username}' and Password = '${md5_pws}'`;
	console.log(sql);
	return conn.load(sql);
}
exports.getUserByToken = function(RefreshToken) {
	var sql = `select * from users where RefreshToken = '${RefreshToken}'`;
	console.log(sql);
	return conn.load(sql);
}