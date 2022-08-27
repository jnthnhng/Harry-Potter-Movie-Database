module.exports = function() {
  var express = require('express');
  var router = express.Router();

  /** Retrieve data from the Character_Movie_Appearances table */

  function getCharacterMovieAppearances(res, mysql, context, complete) {

    mysql.pool.query("SELECT CONCAT(c.first_name, ' ', c.last_name) as full_name, m.title as movie_title, cma.cid as cid, cma.mid as mid FROM Character_Movie_Appearances as cma LEFT JOIN Characters as c ON cma.cid = c.character_id LEFT JOIN Movies as m ON cma.mid = m.movie_id", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characterMovieAppearance = results;
      complete();
    });
  }

  /** Retrieve data from the Characters table */

  function getCharacters(res, mysql, context, complete) {
    mysql.pool.query("SELECT character_id as id, first_name, last_name, house, gender, race FROM Characters", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characters = results;
      complete();
    });
  }

  /** Retrieve data from the Movies table */
  function getMovies(res, mysql, context, complete) {
    mysql.pool.query("SELECT movie_id as id, title, director, runtime, release_date FROM Movies", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.movies = results;
      complete();
    });
  }

  /*Display all character movie appearances. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js"];
    var mysql = req.app.get('mysql');
    getCharacterMovieAppearances(res, mysql, context, complete);
    getCharacters(res, mysql, context, complete);
    getMovies(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 3) {
        res.render('character_movie_appearances', context);
      }

    }
  });

  /* Adds a character movie appearances, redirects to the character_movie_appearances page after adding */

  router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Character_Movie_Appearances (cid, mid) VALUES (?,?)";
    var inserts = [req.body.cid, req.body.mid];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/character_movie_appearances');
      }
    });
  });

  /* DELETES a character_movie_appearance, simply returns a 202 upon success. Ajax will handle this. */

  router.delete('/cid/:cid/mid/:mid', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Character_Movie_Appearances WHERE cid = ? AND mid = ?";
    var inserts = [req.params.cid, req.params.mid];
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
