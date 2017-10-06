const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")()
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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

// router.get('/jp/journey-plan', (req, res, next) => {
//
// })

module.exports = router

// module.exports = {
//   connect: connect,
//   getUsers: getUsers
// }
