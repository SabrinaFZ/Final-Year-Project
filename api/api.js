const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")()
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
  console.log(password)
  db.none('INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password});', req.body)
  .then(function (obj) {
     res.status(201)
       .json({
         status: 'success',
         message: 'Success, user created!',
       });
     console.log("Success,user created!")
  })
  .catch(function (error) {
    next(error)
    console.log("ERROR:", error);
  })

})

module.exports = router

// module.exports = {
//   connect: connect,
//   getUsers: getUsers
// }
