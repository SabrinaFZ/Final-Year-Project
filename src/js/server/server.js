const pg = require('pg');
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path')

module.exports = {
  app: function () {
    const app = express()
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use('/api', require('../api/api'))

    return app
  },
}
