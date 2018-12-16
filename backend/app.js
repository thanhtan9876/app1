var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/requests', require('./router/requestsRouter.js'));
//app.use('/token', require('./router/tokenRouter.js'));

var num_port = 5000;
var port = process.env.port || num_port;
var server=app.listen(port, () =>{
    console.log("Link server: "+require("ip").address()+":" + port);
    console.log("Running server!!!");
})

app.get("/",(req,res)=>{
    res.end("WELCOM TO TAN_SERVICE API!!");
})
