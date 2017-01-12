if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config(); // environment variables, used for hiding secrets
}

var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Connect to a sql database
var sequelize = new Sequelize(process.env.DATABASE_URL);

// Create a new express app to server our api
var app = express()

// Teach express how to parse requests of type application/json
//
app.use(bodyParser.json());

// Teach express how to parse requests of type application/x-www-form-urlencoded
//
app.use(bodyParser.urlencoded({ extended: true }));

// A basic GET route with no functionality and no security protection
app.get('/api', (req, res) => {
  res.send('Hello World!')
});

// OTHER ROUTES USING SEQUELIZE HERE

// Determine which port to listen on
var port = process.env.PORT ? process.env.PORT : 3001

// Actually start the server
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!')
})
