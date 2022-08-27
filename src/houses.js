module.exports = function() {
  var express = require('express');
  var router = express.Router();

  /** Retrieve data from the Houses table */

  function getHouses(res, mysql, context, complete) {

    mysql.pool.query("SELECT house_id as id, h.name as name, m.name as mascot FROM Houses as h LEFT JOIN Mascots as m ON h.mascot = m.mascot_id", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.houses = results;
      complete();
    });
  }

  /** Retrieve a mascot based on ID */

  function getMascots(res, mysql, context, complete) {

    mysql.pool.query("SELECT mascot_id as id, name FROM Mascots", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.mascots = results;
      complete();
    });
  }

  /** Retrieve a house based on ID */

  function getHouse(res, mysql, context, id, complete) {
    var sql = "SELECT house_id as id, name, mascot FROM Houses WHERE house_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.house = results[0];
      complete();
    });
  }

  /* Display one house for the specific purpose of updating houses */

  router.get('/:id', function(req, res) {
    callbackCount = 0;
    var context = {};
    context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
    var mysql = req.app.get('mysql');
    getHouse(res, mysql, context, req.params.id, complete);
    getMascots(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('update-house', context);
      }
    }
  });

  /*Display all houses. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete.js", "updateFunctions.js"];
    var mysql = req.app.get('mysql');
    getHouses(res, mysql, context, complete);
    getMascots(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('houses', context);
      }
    }
  });


  /* Adds a house, redirects to the houses page after adding */

  router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Houses (name, mascot) VALUES (?,?)";
    var inserts = [req.body.house_name, req.body.mascot_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error))
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/houses');
      }
    });
  });

  /* The URI that update data is sent to in order to update a house */

  router.put('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "UPDATE Houses SET name = ?, mascot = ? WHERE house_id = ?";
    var inserts = [req.body.new_house_name, req.body.new_mascot_id, req.params.id];
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

  /* DELETES a house, simply returns a 202 upon success. Ajax will handle this. */

  router.delete('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Houses WHERE house_id = ?";
    var inserts = [req.params.id];
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
