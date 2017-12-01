const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var request = require('request-promise');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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')

var db = null
pgp.pg.defaults.ssl = true;

if(process.env.NODE_ENV == 'production') {
  db = pgp("postgres://dxshgaaudfuttt:636bee3eefe840a62d9e2ebdeb3da441f5a580a900e65e4e279332911c5c8c3b@ec2-184-72-230-93.compute-1.amazonaws.com:5432/d5qmmgsv415fv1")
}

if(process.env.NODE_ENV == 'development') {
  db = pgp("postgresql://sabrina:sabrina@127.0.0.1:5432/sabrina")
}

router.post('/email', (req, res, next) => {
  let email = req.body.email
  let order = req.body.order
  try{
    
    return res.status(200)
      .json({
        status: 'success',
        message: 'Email sent',
      });
  } catch(err){
    return res.status(500)
      .json({
        status: 'error',
        message: 'Email not sent'
      })
  }
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
  let order = req.body.orders
  
  if (cardHolderName === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Please enter a cardholdername'
      })
  }
  else if (expiryDate === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid Expiry Date'
      })
  }
  else if (cvv.toString().length < 3) {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid CVV'
      })
  }
  else if (number.toString().length < 12) {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid credit card number'
      })
  }
  else if (address.postcode === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid postcode'
      })
  }
  else if (address.country === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid country'
      })
  }
  else if (address.line_1 === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid address line 1'
      })
  }
  else if (email === '') {
    return res.status(500)
      .json({
        status: 'error',
        message: 'Invalid email'
      })
  } else {
    let payload = {
      id: id,
      amount: amount
    }
    var text = order.trips.map((item, index) => {
      return `Origin: ${item.outward.origin_station_name}, Destination: ${item.outward.destination_station_name}, Leaving At: ${item.outward.origin_time}, Arriving At: ${item.outward.destination_time}`
    })
    var html = order.trips.map((item, index) => {
      return (
        `
        <p>
          <strong>Origin: ${item.outward.origin_station_name}</strong>
          <br>
          <strong>Destination: ${item.outward.destination_station_name}</strong>
          <br>
          <strong>Leaving At: ${item.outward.origin_time}</strong>
          <br>
          <strong>Arriving At: ${item.outward.destination_time}</strong>
        </p>
      `
      )
    })
    const msg = {
      to: `${email}`,
      from: 'test@example.com',
      subject: `Your booking confirmation: ID${order.id} `,
      text: `${text}`,
      html: `<p>Here is your order:</p> ${html} <p>Have a nice trip,<br>Regards</p>`
    }
    sgMail.send(msg)

    return res.status(200)
      .json({
        status: 'success',
        message: payload,
      });
  }

})

module.exports = router

