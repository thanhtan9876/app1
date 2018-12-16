express = require('express');
var requestsCtrl= require('../controller/requestsCtrl')

var router = express.Router();

router.route('/login')
.post(requestsCtrl.login)

router.route('/register')
.post(requestsCtrl.register)

router.route('/insertRequests')
.post(requestsCtrl.insertRequests)
module.exports = router;