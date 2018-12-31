var mysql = require('mysql');

// thưc thi các query select database
exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password:'root',
            database:'booking_cars'
        });

        connection.query(sql, (error, results, fields) => {
            if (error)
                reject(error);
            else resolve(results);

            connection.end();
        });
    });
}
exports.check=function(){
    return new Promise((resolve, reject)=>{
        var con = mysql.createConnection({
          host: 'localhost',
          port: '3306',
          user: 'root',
          password:'',
          database:'booking_cars'
      });

        con.connect(function(err) {
            if (err) reject(error);
          resolve("connect!!!");
      });
    })

}
//thưc thi các query insert,update,delete database
exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password:'root',
            database:'booking_cars'
        });

        connection.connect();

        connection.query(sql, (error, value) => {
            if (error)
                reject(error);
            else resolve(value);

            connection.end();
        });
    });
}
