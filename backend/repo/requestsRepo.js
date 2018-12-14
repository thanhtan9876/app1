var conn=require('../database/connect')

exports.insertRequest = function(requests) {
	var sql = `insert into requests(GuestName,GuestTelephone,NameLocation,created_at) values('${requests.GuestName}','${requests.GuestTelephone}','${requests.NameLocation}',${requests.created_at})`;
	console.log(sql);
	return conn.load(sql);
}