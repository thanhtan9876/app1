var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var signupController = require('./controller/signupController');
var loginController = require('./controller/loginController');
var userController = require('./controller/userController');
var requestController = require('./controller/requestsController');

app.get ('/', (req, res) => {
  res.json({
    msg: 'Request Receiver'
  });
})

var verifyAccessToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'SECRET-BOOKING-CARS-TOKEN', (err, payload) => {
      if (err) {
        res.statusCode = 403;
        res.json({
          msg: 'INVALID TOKEN',
          error: err
        });
      } else {
        req.token_payload = payload;
        next();
      }
    })
  } else {
    res.statusCode = 403;
    res.json({
      msg: `TOKEN DOESN'T EXIST`
    });
  }
}

app.use('/users', verifyAccessToken, userController);
app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/requests', verifyAccessToken, requestController);

app.use((req, res, next) => {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    'error': err.message
  });
})

var port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
