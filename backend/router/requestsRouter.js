express = require('express');
var requestsCtrl= require('../controller/requestsCtrl')

var router = express.Router();

router.route('/login')
.get(requestsCtrl.login)

router.route('/register')
.get(requestsCtrl.register)

router.route('/insertRequests')
.post(requestsCtrl.insertRequests)
module.exports = router;