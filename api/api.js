const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")()
pgp.pg.defaults.ssl = true;
pgp("postgres://lpombgdnyryjaq:1c788f5e971cb6fd08aa8599ce5ea09afe5061a8a1425fbcd55ea6f66811bca2@ec2-107-20-255-96.compute-1.amazonaws.com:5432/da10rpt0n0onqh")

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
