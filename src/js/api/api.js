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
      next(error)
      console.log("ERROR:", error.message);
   });
})

router.get('/users', (req, res, next) => {
    var result;
    db.any('SELECT * FROM users', [true])
    .then(function (data) {
      result = JSON.stringify(data);
      console.log("VALUES: "+ result)
       res.send(data)
    })
    .catch(function (error) {
      next(error)
      console.log("ERROR:", error);
    })
})

router.post('/users', (req, res, next) =>{
  let name = req.body.name
  console.log(name)
  let email = req.body.email
  console.log(email)
  let password = req.body.password

  db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]).then(function(err, user){
    if(err){
      console.log("ERROR:", err);
      return next(err)
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
          .json({
             status: 'success',
             token: token,
          })
      })
      .catch(function (error) {
        next(error)
        console.log("ERROR:", error);
      })
      // return bcrypt.genSalt(10).then(function(salt) {
      //   console.log('bcrypt')
      //   return bcrypt.hash(password.trim(), salt);
      // })//bcrypt
      // .then(function(hashedPassword) {
      //   console.log('hashedPassword')
      //   var newUser = {
      //     email: email.trim(),
      //     password: hashedPassword,
      //     name: name.trim()
      //   }
      //   db.none('INSERT INTO users (email, password, name) VALUES (${email}, ${password}, ${name});', newUser)
      //   .then(function (obj) {
      //     var payload = {
      //       sub: user.id,
      //       user: user.username
      //     }
      //     var token = jwt.sign(payload, 'shhhhh', {
      //       expiresIn: '7d'
      //     })
      //     res.status(201)
      //     .json({
      //        status: 'success',
      //        token: token,
      //     })
      //     console.log("Success,user created!")
      //   })
      //   .catch(function (error) {
      //     next(error)
      //     console.log("ERROR:", error);
      //   })
      // })//hashedPassword
    }//if
    else{
      var error = new Error('This email is already registered');
      error.name = 'IncorrectRegisterUser';
      return next(error)
    }
  }) //Db
}) //end

router.post('/login', (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]).then(function (user){
      if(!user){
        var error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return next(error)
      }
      bcrypt.compare(password, user.password).then(function(data){
        if(!data){
          var error = new Error('Incorrect username or password');
          error.name = 'IncorrectCredentialsError';
          return next(error)
        }
        let payload = {
          sub: user.id,
          user: user.username
        }

        let token = jwt.sign(payload, 'shhhhh', {
          expiresIn: '7d'
        })

        res.status(200)
          .json({
            status: 'success',
            token: token,
          });
        console.log("Success, release connection!")
        //return done(null, token);
      })
    })
    .catch(function (error){
      next(error)
  })



})

module.exports = router

// module.exports = {
//   connect: connect,
//   getUsers: getUsers
// }
