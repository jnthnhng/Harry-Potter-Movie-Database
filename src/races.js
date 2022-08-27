module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /** Retrieve data from the Races table */

    function getRaces(res, mysql, context, complete){

        mysql.pool.query("SELECT race_id as id, blood_type FROM Races", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.races = results;
            complete();
        });
    }

    /** Retrieve a Race based on ID */
    function getRace(res, mysql, context, id, complete) {
        var sql = "SELECT race_id as id, blood_type FROM Races WHERE race_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.race = results[0];
            complete();
        });
    }

    /* Display one race for the specific purpose of updating races */

    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
        var mysql = req.app.get('mysql');
        getRace(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-race', context);
            }
        }
    });

    /*Display all races. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getRaces(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('races', context);
            }
        }
    });

    /* Adds a race, redirects to the races page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Races (blood_type) VALUES (?)";
        var inserts = [req.body.blood_type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/races');
            }
        });
    });

    /* The URI that update data is sent to in order to update a race */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Races SET blood_type=? WHERE race_id=?";
        var inserts = [req.body.new_blood_type, req.params.id];
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

    /* DELETES a race, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Races WHERE race_id = ?";
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
