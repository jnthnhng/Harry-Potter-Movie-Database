// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'cs340-db.cl0p1eksh2zm.us-east-2.rds.amazonaws.com',
    user            : '***',
    password        : '***',
    database        : 'HarryPotterMovies'
})

// Export it for use in our applicaiton
module.exports.pool = pool;