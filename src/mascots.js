module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /** Retrieve data from the Mascots table */

    function getMascots(res, mysql, context, complete){

        mysql.pool.query("SELECT mascot_id as id, name FROM Mascots", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.mascots = results;
            complete();
        });
    }

    /** Retrieve a Mascot based on ID */

    function getMascot(res, mysql, context, id, complete) {
        var sql = "SELECT mascot_id as id, name FROM Mascots WHERE mascot_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.mascot = results[0];
            complete();
        });
    }

    /* Display one mascot for the specific purpose of updating mascots */

    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
        var mysql = req.app.get('mysql');
        getMascot(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-mascot', context);
            }
        }
    });

    /*Display all mascots. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {}; // our object
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getMascots(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('mascots', context);
            }
        }
    });

    /* Adds a mascot, redirects to the mascots page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Mascots (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/mascots');
            }
        });
    });

    /* The URI that update data is sent to in order to update a mascot */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Mascots SET name=? WHERE mascot_id=?";
        var inserts = [req.body.new_mascot_name, req.params.id];
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

    /* DELETES a mascot, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Mascots WHERE mascot_id = ?";
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
