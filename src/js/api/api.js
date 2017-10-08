const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var request = require('request-promise');

var db = null
pgp.pg.defaults.ssl = true;

if(process.env.NODE_ENV == 'production') {
  db = pgp("postgres://dxshgaaudfuttt:636bee3eefe840a62d9e2ebdeb3da441f5a580a900e65e4e279332911c5c8c3b@ec2-184-72-230-93.compute-1.amazonaws.com:5432/d5qmmgsv415fv1")
}

if(process.env.NODE_ENV == 'development') {
  db = pgp("postgresql://sabrina:sabrina@127.0.0.1:5432/sabrina")
}

//const db = pgp("")

router.get('/', (req, res, next) => {
   db.connect()
   .then(function (obj) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Success, release connection!',
        });
      console.log("Success, release connection!")
   })
   .catch(function (error) {
     res.status(500)
       .json({
          status: 'error',
          error: error.message,
       })
   });
})

router.get('/users', (req, res, next) => {
    var result;
    db.any('SELECT * FROM users', [true])
    .then(function (data) {
      //result = JSON.stringify(data);
      console.log("VALUES: "+ result)
       res.send(data)
    })
    .catch(function (error) {
      res.status(500)
        .json({
           status: 'error',
           error: error.message,
        })
    })
})

router.post('/signup', (req, res, next) =>{
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password
  let repeatPassword = req.body.repeatPassword

  if(repeatPassword != password) {
    return res.status(400).send('The password do not match !')
  }

  db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]).then(function(err, user){
    if(err){
      return res.status(500)
        .json({
           status: 'error',
           error: err,
        })
    }
    if(!user){
      var hash = bcrypt.hashSync(password.trim(), 10);
      var newUser = {
        email: email.trim(),
        password: hash,
        name: name.trim()
      }

      db.query('INSERT INTO users (email, password, name) VALUES (${email}, ${password}, ${name});', newUser)
      .then(function (user) {
        var payload = {
          id: user.id,
          user: user.email
        }
        var token = jwt.sign(payload, 'shhhhh', {
          expiresIn: '7d'
        })
        res.status(201)
          .send({
             token: token,
          })
      })
      .catch(function (error) {
        res.status(500)
          .send('Internal error !')
      })

    }//if
    else{
      return res.status(400)
        .send('This email is already registered, try again !')
    }
  }) //Db
}) //end

router.get('/login', (req, res, next) => {
  var data = {
    uri: 'http://localhost:8080/api/login',
    method: 'GET',
    json: true
  }

  request(data)
    .then(function (response) {
      res.send(response)
    })
    .catch(function (err) {
      res.send(err)
    })
})

router.post('/login', (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]).then(function (user){
      if(!user){
        return res.status(400)
          .send('Wrong credentials, try again !')
      }
      bcrypt.compare(password, user.password).then(function(data){
        if(!data){
          return res.status(400)
            .send('Wrong credentials, try again !')
        }
        let payload = {
          sub: user.id,
          user: user.username
        }

        let token = jwt.sign(payload, 'shhhhh', {
          expiresIn: '7d'
        })

        res.status(200)
          .send({
            token: token,
          });
        console.log("Success, release connection!")
        //return done(null, token);
      })
    })
    .catch(function (error){
      res.status(500)
        .send('Internal error ')
  })
})

router.post('/jp/journey-plan', (req, res, next) => {
  let origin = req.body.origin
  let destination = req.body.destination

  var data = {
    uri: 'http://localhost:8080/api/jp/journey-plan',
    method: 'POST',
    body: {
      origin: origin,
      destination: destination
    },
    json: true
  }

  request(data)
    .then(function (response) {
      res.send(response)
    })
    .catch(function (err) {
      res.send(err)
    })

  // res.status(201).send(
  //   {
  //     "ticketBundles": {
  //       "items": [
  //         {
  //           "origin": "/data/stations/1234",
  //           "destination": "/data/stations/5678",
  //           "alternateDestinations": ["/data/stations/2345", "/data/stations/4567"],
  //           "ticketType": "/data/ticket-types/ABC",
  //           "route": "/data/routes/12345",
  //           "restriction": "AB",
  //           "crossLondon": true,
  //           "utsZones": [1, 2],
  //           "outwardValidity": {
  //             "from": "2016-04-12",
  //             "until": "2016-05-12",
  //             "break": true
  //           },
  //           "price": 6000,
  //           "originalPrice": 8000,
  //           "discountCode": "25PC",
  //           "discountPercent": 25,
  //           "adults": 1,
  //           "children": 0,
  //           "statusCode": "012",
  //           "railcard": "/data/railcards/YNG",
  //           "railcardDiscount": 1000
  //         }
  //       ]
  //     },
  //     "result": {
  //       "outward": [
  //         {
  //           "journey": "/jp/journeys/1234",
  //           "fares": {
  //             "singles": ["/jp/fares/fdg53fg3", "/jp/fares/6jaqfvw"],
  //             "returns": ["/jp/fares/445g45gd", "/jp/fares/j5654"],
  //             "cheapest": {
  //               "outboundSingle": "/jp/fares/fdg53fg3",
  //               "inboundSingle": "/jp/fares/445g45gd",
  //               "totalPrice": 20450
  //             }
  //           }
  //         },
  //         {
  //           "journey": "/jp/journeys/5678",
  //           "fares": {
  //             "singles": ["/jp/fares/fdg53fg3", "/jp/fares/6jaqfvw"],
  //             "returns": ["/jp/fares/445g45gd", "/jp/fares/j5654"],
  //             "cheapest": {
  //               "outboundSingle": "/jp/fares/fdg53fg3",
  //               "inboundSingle": "/jp/fares/445g45gd",
  //               "totalPrice": 20450
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     "links": {
  //       "/jp/journeys/1234": {
  //         "origin": {
  //           "station": "/data/stations/1234",
  //           "time": {
  //             "scheduledTime": "2016-04-12T12:13:00Z",
  //             "adjustedTime": "2016-04-12T12:13:00Z",
  //             "confidence": "Actual"
  //           },
  //           "platform": "12"
  //         },
  //         "destination": {
  //           "station": "/data/stations/5678",
  //           "time": {
  //             "scheduledTime": "2016-04-12T16:30:00Z",
  //             "adjustedTime": "2016-04-12T16:37:00Z",
  //             "confidence": "Estimate",
  //             "delayed": true,
  //             "delayReason": "Leaves on the line"
  //           }
  //         },
  //         "changes": 2,
  //         "legs": [
  //           {
  //             "origin": [{
  //               "station": "/data/stations/1234",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T12:13:00Z",
  //                 "adjustedTime": "2016-04-12T12:13:00Z",
  //                 "confidence": "Actual"
  //               },
  //               "platform": "12"
  //             }],
  //             "destination": [{
  //               "station": "/data/stations/1357",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T12:23:00Z",
  //                 "adjustedTime": "2016-04-12T12:23:00Z",
  //                 "confidence": "Uncertain"
  //               }
  //             }],
  //             "serviceDetails": {
  //               "mode": "Train",
  //               "retailServiceId": "AB1234",
  //               "trainUid": "Y12345",
  //               "iptisTripIdentifier": "Y12345|2016-04-01",
  //               "toc": "AB",
  //               "reservable": "No",
  //               "isTemporaryTrain": false,
  //               "isCountedPlace": false
  //             }
  //           },
  //           {
  //             "origin": [{"station": "/data/stations/1357"}],
  //             "destination": [{"station": "/data/stations/9876"}],
  //             "serviceDetails": {
  //               "mode": "Metro",
  //               "transferAdvice": ["From Farringdon take the Hammersmith & City, the Circle Line or the Metropolitan Line (Eastbound, Platform 1) all of which are direct services to Moorgate Underground Station."],
  //               "isTemporaryTrain": false,
  //               "isCountedPlace": false
  //             },
  //             "fixed": true,
  //             "transferTime": 10
  //           },
  //           {
  //             "origin": [{
  //               "station": "/data/stations/9876",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T13:33:00Z",
  //                 "adjustedTime": "2016-04-12T13:33:00Z",
  //                 "confidence": "Actual"
  //               }
  //             }],
  //             "destination": [{
  //               "station": "/data/stations/5678",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T16:30:00Z",
  //                 "adjustedTime": "2016-04-12T16:37:00Z",
  //                 "confidence": "Estimate",
  //                 "delayed": true,
  //                 "delayReason": "Leaves on the line"
  //               }
  //             }],
  //             "serviceDetails": {
  //               "mode": "Train",
  //               "toc": "CD",
  //               "reservable": "Possible",
  //               "facilities": {
  //                 "firstClass": true,
  //                 "trolley": true
  //               },
  //               "isTemporaryTrain": false,
  //               "isCountedPlace": false
  //             }
  //           }
  //         ],
  //         "callingPoints": "/jp/journeys/1234/calling-points",
  //         "isOvertaken": false,
  //         "bulletins": ["/jp/bulletins/weewagew"]
  //       },
  //       "/jp/journeys/5678": {
  //         "origin": {
  //           "station": "/data/stations/1234",
  //           "time": {
  //             "scheduledTime": "2016-04-12T12:43:00Z",
  //             "adjustedTime": "2016-04-12T12:43:00Z",
  //             "confidence": "Actual"
  //           }
  //         },
  //         "destination": {
  //           "station": "/data/stations/5678",
  //           "time": {
  //             "scheduledTime": "2016-04-12T16:50:00Z",
  //             "adjustedTime": "2016-04-12T16:50:00Z",
  //             "confidence": "Unknown"
  //           }
  //         },
  //         "changes": 0,
  //         "legs": [
  //           {
  //             "origin": [{
  //               "station": "/data/stations/1234",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T12:43:00Z",
  //                 "adjustedTime": "2016-04-12T12:43:00Z",
  //                 "confidence": "Actual"
  //               }
  //             }],
  //             "destination": [{
  //               "station": "/data/stations/5678",
  //               "time": {
  //                 "scheduledTime": "2016-04-12T16:50:00Z",
  //                 "adjustedTime": "2016-04-12T16:50:00Z",
  //                 "confidence": "Unknown"
  //               }
  //             }],
  //             "serviceDetails": {
  //               "mode": "Train",
  //               "toc": "CD",
  //               "reservable": "Possible",
  //               "isTemporaryTrain": false,
  //               "isCountedPlace": false
  //             }
  //           }
  //         ],
  //         "callingPoints": "/jp/journeys/5678/calling-points",
  //         "isOvertaken": false,
  //         "bulletins": []
  //       }
  //     }
  //   }
  // )
})

module.exports = router

// module.exports = {
//   connect: connect,
//   getUsers: getUsers
// }
