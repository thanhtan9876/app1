var db = require('../database/connect')

exports.insertRequest = function(requests) {
	var sql = `insert into REQUESTS(GuestName, GuestTelephone, NameLocation, FinishLocationName, Note, created_at) values('${requests.GuestName}','${requests.GuestTelephone}','${requests.NameLocation}','${requests.FinishLocationName}','${requests.Note}',${requests.created_at})`;
	return db.load(sql);
}