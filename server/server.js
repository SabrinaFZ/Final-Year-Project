const pg = require('pg');
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path')

module.exports = {
  app: function () {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', require('./api/api'))

    return app
  },
}
