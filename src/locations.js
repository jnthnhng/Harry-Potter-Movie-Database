module.exports = function() {
  var express = require('express');
  var router = express.Router();

  /** Retrieve data from the Locations table */

  function getLocations(res, mysql, context, complete) {

    mysql.pool.query("SELECT l.location_id as id, l.name as name, lt.type as type FROM Locations as l LEFT JOIN Locations_Types as lt ON l.type = lt.location_type_id", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.locations = results;
      complete();
    });
  }

  /** Retrieve data from the Locations_Types table */

  function getLocationsTypes(res, mysql, context, complete) {

    mysql.pool.query("SELECT location_type_id as id, type FROM Locations_Types", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.locationsTypes = results;
      complete();
    });
  }

  /** Retrieve a location based on ID */

  function getLocation(res, mysql, context, id, complete) {
    var sql = "SELECT location_id as id, name, type FROM Locations WHERE location_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.location = results[0];
      complete();
    });
  }

  /* Display one location for the specific purpose of updating locations */

  router.get('/:id', function(req, res) {
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
    var mysql = req.app.get('mysql');
    getLocation(res, mysql, context, req.params.id, complete);
    getLocationsTypes(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('update-location', context);
      }
    }
  });


  /*Display all locations. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js"];
    var mysql = req.app.get('mysql');
    getLocations(res, mysql, context, complete);
    getLocationsTypes(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('locations', context);
      }
    }
  });

  /* Adds a location, redirects to the locations page after adding */

  router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Locations (name, type) VALUES (?,?)";
    var inserts = [req.body.name, req.body.type];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/locations');
      }
    });
  });

  /* The URI that update data is sent to in order to update a location */

  router.put('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "UPDATE Locations SET name=?, type=? WHERE location_id=?";
    var inserts = [req.body.new_location_name, req.body.new_location_type, req.params.id];
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

  /* DELETES a location, simply returns a 202 upon success. Ajax will handle this. */

  router.delete('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Locations WHERE location_id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error)
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
        

      } else {

        var sql = "DELETE FROM Locations_in_Movies WHERE mid IS NULL OR lid IS NULL";
        sql = mysql.pool.query(sql, function(error, results, fields) {
          if (!error) {
            res.status(202).end();
          }
          else {
            console.log(error)
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
          }
        })
      }
    })
  })

  return router;
}();
