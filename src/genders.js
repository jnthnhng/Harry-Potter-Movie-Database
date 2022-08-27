module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /** Retrieve data from the Genders table */

    function getGenders(res, mysql, context, complete){

        mysql.pool.query("SELECT gender_id as id, gender_type FROM Genders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genders = results;
            complete();
        });
    }

    /** Get a gender based on ID */

    function getGender(res, mysql, context, id, complete) {
        var sql = "SELECT gender_id as id, gender_type FROM Genders WHERE gender_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.gender = results[0];
            complete();
        });
    }

    /* Display one gender for the specific purpose of updating genderse */

    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedFunctions.js", "updateFunctions.js"];
        var mysql = req.app.get('mysql');
        getGender(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-gender', context);
            }
        }
    });


    /*Display all genders. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getGenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('genders', context);
                
            }

        }
    });

    /* Adds a gender, redirects to the genderse page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Genders (gender_type) VALUES (?)";
        var inserts = [req.body.gender_type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/genders');
            }
        });
    });

    /* The URI that update data is sent to in order to update a gender */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Genders SET gender_type=? WHERE gender_id=?";
        var inserts = [req.body.new_gender_type, req.params.id];
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

    /* DELETES a gender, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Genders WHERE gender_id = ?";
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
