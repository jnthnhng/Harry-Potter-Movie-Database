/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./database/db-connector.js');
var bodyParser = require('body-parser');

var app = express();

var handlebars = require('express-handlebars'); // Import express-handlebars
app.engine(
  '.hbs',
  handlebars({
    // Create an instance of the handlebars engine to process templates
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('port', 7719);
app.set('mysql', mysql);


app.use('/character_movie_appearances', require('./character_movie_appearances.js'));
app.use('/characters', require('./characters.js'));
app.use('/genders', require('./genders.js'));
app.use('/houses', require('./houses.js'));
app.use('/locations_in_movies', require('./locations_in_movies.js'));
app.use('/locations_types', require('./locations_types.js'));
app.use('/locations', require('./locations.js'));
app.use('/mascots', require('./mascots.js'));
app.use('/movies', require('./movies.js'));
app.use('/races', require('./races.js'));

app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});