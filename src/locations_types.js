module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /** Retrieve data from the Locations_Types table */

    function getLocationsTypes(res, mysql, context, complete){

        mysql.pool.query("SELECT location_type_id as id, type FROM Locations_Types", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locationsTypes = results;
            complete();
        });
    }

    /** Retrieve a location type based on ID */

    function getLocationType(res, mysql, context, id, complete) {
        var sql = "SELECT location_type_id as id, type FROM Locations_Types WHERE location_type_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locationType = results[0];
            complete();
        });
    }

    /* Display one locations_type for the specific purpose of updating locations_types */

    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
        var mysql = req.app.get('mysql');
        getLocationType(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-location-type', context);
            }
        }
    });

    /*Display all locations_types. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getLocationsTypes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations_types', context);
            }

        }
    });

    /* Adds a locations_type, redirects to the locations_types page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Locations_Types (type) VALUES (?)";
        var inserts = [req.body.location_type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/locations_types');
            }
        });
    });

    /* The URI that update data is sent to in order to update a locations_type */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Locations_Types SET type=? WHERE location_type_id=?";
        var inserts = [req.body.new_location_type, req.params.id];
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

    /* DELETES a locations_type, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Locations_Types WHERE location_type_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
