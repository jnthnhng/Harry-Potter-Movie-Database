module.exports = function() {
  var express = require('express');
  var router = express.Router();

  /** Retrieve data from the Locations_in_Movies table */

  function getLocationsInMovies(res, mysql, context, complete) {

    mysql.pool.query("SELECT m.title as movie_title, l.name as location_name, m.movie_id as mid, l.location_id as lid FROM Locations_in_Movies as lim LEFT JOIN Locations as l ON lim.lid = l.location_id LEFT JOIN Movies as m ON lim.mid = m.movie_id", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.locationsInMovies = results;
      complete();
    });
  }

  /** Retrieve location based on ID */

  function getLocations(res, mysql, context, complete) {

    mysql.pool.query("SELECT location_id as lid, name, type FROM Locations", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.locations = results;
      complete();
    });
  }

  /** Retrieve movie based on ID */

  function getMovies(res, mysql, context, complete) {

    mysql.pool.query("SELECT movie_id as mid, title, director, runtime, release_date FROM Movies", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.movies = results;
      complete();
    });
  }

  /** Retrieve movie based on ID */

  function getLocationInMovie(res, mysql, context, mid, lid, complete) {
    var sql = "SELECT mid, lid FROM Locations_in_Movies WHERE mid=? AND lid=?";
    var inserts = [mid, lid];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.location_in_movie = results[0];
      complete();
    });
  }

  /** Used to update a specific movie ID and location ID relationship */

  router.get('/mid/:mid/lid/:lid', function(req, res) {
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
    var mysql = req.app.get('mysql');
    getLocationInMovie(res, mysql, context, req.params.mid, req.params.lid, complete);
    getLocations(res, mysql, context, complete);
    getMovies(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 3) {
        res.render('update-locations-in-movies', context);
      }
    }
  });

  /*Display all locations_in_movies. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js"];
    var mysql = req.app.get('mysql');
    getLocationsInMovies(res, mysql, context, complete);
    getLocations(res, mysql, context, complete);
    getMovies(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 3) {
        res.render('locations_in_movies', context);
      }
    }
  });

  /* Adds a locations_in_movies, redirects to the locations_in_movies page after adding */

  router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Locations_in_Movies (mid, lid) VALUES (?,?)";
    var inserts = [req.body.mid, req.body.lid];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/locations_in_movies');
      }
    });
  });

  /* The URI that update data is sent to in order to update a locations_in_movies */

  router.put('/mid/:mid/lid/:lid', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var sql = "UPDATE Locations_in_Movies SET mid=?, lid=? WHERE mid=? AND lid=?";
      var inserts = [req.body.new_movie_id, req.body.new_location_id, req.params.mid, req.params.lid];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.status(200);
              res.end();
          }
      });
  });

  /* DELETES a locations_in_movies, simply returns a 202 upon success. Ajax will handle this. */

  router.delete('/mid/:mid/lid/:lid', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Locations_in_Movies WHERE mid = ? and lid = ?";
    var inserts = [req.params.mid, req.params.lid];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error)
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202).end();
      }
    })
  })

  return router;
}();
