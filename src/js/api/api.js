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

router.post('/payment', (req, res, next) => {
  let id = req.body.id
  let amount = req.body.amount
  let cardHolderName = req.body.cardHolderName
  let email = req.body.email
  let expiryDate = req.body.expiryDate
  let address = req.body.address
  let number = req.body.number
  let cvv = req.body.cvv
  
  if (cardHolderName === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Please enter a cardholdername'
      })
  }
  else if (expiryDate === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid Expiry Date'
      })
  }
  else if (cvv.toString().length < 3) {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid CVV'
      })
  }
  else if (number.toString().length < 12) {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid credit card number'
      })
  }
  else if (address.postcode === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid postcode'
      })
  }
  else if (address.country === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid country'
      })
  }
  else if (address.line_1 === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid address line 1'
      })
  }
  else if (email === '') {
    res.status(500)
      .json({
        status: 'error',
        message: 'Invalid email'
      })
  } else {
    let payload = {
      id: id,
      amount: amount
    }
    res.status(200)
      .json({
        status: 'success',
        message: payload,
      });
  }

})

module.exports = router

