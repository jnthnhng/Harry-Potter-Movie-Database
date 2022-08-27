module.exports = function() {
  var express = require('express');
  var router = express.Router();

  /** GET functions for characters page */

  function getCharacters(res, mysql, context, complete) {
    mysql.pool.query("SELECT c.character_id as id, c.first_name, c.last_name,  h.name AS house, g.gender_type AS gender, r.blood_type AS race FROM Characters AS c LEFT JOIN Houses AS h ON c.house = h.house_id LEFT JOIN Genders AS g ON c.gender = g.gender_id LEFT JOIN Races as r ON c.race = r.race_id;", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characters = results;
      complete();
    });
  }

  /** Retrieve data from the Genders table */

  function getGenders(res, mysql, context, complete) {

    mysql.pool.query("SELECT gender_id as id, gender_type FROM Genders", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.genders = results;
      complete();
    });
  }

  /** Retrieve data from the Houses table */

  function getHouses(res, mysql, context, complete) {

    mysql.pool.query("SELECT house_id as id, name, mascot FROM Houses", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.houses = results;
      complete();
    });
  }

  /** Retrieve data from the Races table */

  function getRaces(res, mysql, context, complete) {

    mysql.pool.query("SELECT race_id as id, blood_type FROM Races", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.races = results;
      complete();
    });
  }

  /** Retrieve a character by ID */
  function getCharacter(res, mysql, context, id, complete) {
    var sql = "SELECT character_id as id, first_name, last_name, house, gender, race FROM Characters WHERE character_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.character = results[0];
      complete();
    });
  }

  /** A get function used to filter characters by house */
  function getCharactersByHouse(req, res, mysql, context, complete) {
    var query = "SELECT Characters.character_id as id, first_name, last_name, Houses.name AS house, Genders.gender_type as gender, Races.blood_type as race FROM Characters INNER JOIN Houses ON house = Houses.house_id INNER JOIN Genders ON gender = Genders.gender_id INNER JOIN Races ON race = Races.race_id WHERE Characters.house = ?";
    console.log(req.params)
    var inserts = [req.params.house]
    mysql.pool.query(query, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characters = results;
      complete();
    });
  }

  /* Find characters whose first name starts with a given string in the req */
  function getCharactersWithNameLike(req, res, mysql, context, complete) {
    //sanitize the input as well as include the % character
    var query = "SELECT Characters.character_id as id, first_name, last_name, Houses.name AS house, Genders.gender_type as gender, Races.blood_type as race FROM Characters INNER JOIN Houses ON house = Houses.house_id INNER JOIN Genders ON gender = Genders.gender_id INNER JOIN Races ON race = Races.race_id WHERE Characters.first_name LIKE " + mysql.pool.escape(req.params.s + '%');
    console.log(query)

    mysql.pool.query(query, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characters = results;
      complete();
    });
  }

  /* Display one character for the specific purpose of updating a character */

  router.get('/:id', function(req, res) {
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
    var mysql = req.app.get('mysql');
    getCharacter(res, mysql, context, req.params.id, complete);
    getGenders(res, mysql, context, complete);
    getHouses(res, mysql, context, complete);
    getRaces(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 4) {
        res.render('update-character', context);
      }
    }
  });

  /*Display all characters. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js", "search.js", "filter.js"];
    var mysql = req.app.get('mysql');
    getCharacters(res, mysql, context, complete);
    getGenders(res, mysql, context, complete);
    getHouses(res, mysql, context, complete);
    getRaces(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 4) {
        res.render('characters', context);
      }
    }
  });

  /*Display all character from a given house. Requires web based javascript to delete users with AJAX*/
  router.get('/filter/:house', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js", "filter.js", "search.js"];
    var mysql = req.app.get('mysql');
    getCharactersByHouse(req, res, mysql, context, complete);
    getHouses(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('characters', context);
      }

    }
  });

  /*Display all characters whose name starts with a given string. Requires web based javascript to delete users with AJAX */

  router.get('/search/:s', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js", "filter.js", "search.js"];
    var mysql = req.app.get('mysql');
    getCharactersWithNameLike(req, res, mysql, context, complete);
    // getCharacters(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('characters', context);
      }
    }
  });

  /* Adds a Character, redirects to the characters page after adding */

  router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Characters (first_name, last_name, house, gender, race) VALUES (?,?,?,?,?)";
    var inserts = [req.body.first_name, req.body.last_name, req.body.house, req.body.gender, req.body.race];
    console.log(inserts)
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/characters');
      }
    });
  });

  /* The URI that update data is sent to in order to update a character */

  router.put('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    console.log(req.body)
    console.log(req.params.id)
    var sql = "UPDATE Characters SET first_name=?, last_name=?, gender=?, house=?, race=? WHERE character_id=?";
    var inserts = [req.body.first_name, req.body.last_name, req.body.new_gender_id, req.body.new_house_id, req.body.new_race_id, req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error)
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    });
  });

  /* DELETES a character, simply returns a 202 upon success. Ajax will handle this. */

  router.delete('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Characters WHERE character_id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error)
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        var sql = "DELETE FROM Character_Movie_Appearances WHERE cid IS NULL OR mid IS NULL";
        sql = mysql.pool.query(sql, function(error, results, fields) {
          if (!error) {
            res.status(202).end();
          }
          else {
            res.status(400);
            res.end();
          }
        })
      }
    })
  })

  return router;
}();
