module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /** Retrieve data from the Movies table */

    function getMovies(res, mysql, context, complete){

        mysql.pool.query("SELECT movie_id as id, title, director, runtime, DATE_FORMAT(release_date, '%M %d %Y') as release_date FROM Movies", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.movies = results;
            complete();
        });
    }

    /*Display all movies. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getMovies(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('movies', context);
            }
        }
    });

    /* Adds a movie, redirects to the movies page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Movies (title, director, runtime, release_date) VALUES (?,?,?,?)";
        var inserts = [req.body.title, req.body.director, req.body.runtime, req.body.release_date];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/movies');
            }
        });
    });

    /* DELETES a movie, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Movies WHERE movie_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields)
        {
            if(error)
            {
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }
            else
            {
                var sql = "DELETE FROM Character_Movie_Appearances WHERE cid IS NULL OR mid IS NULL";
                sql = mysql.pool.query(sql, function(error, results, fields) 
                {
                  if (!error)
                  {
                    res.status(202);
                  } 
                  else 
                  {
                    res.status(400);
                  }
                })

                var sql = "DELETE FROM Locations_in_Movies WHERE mid IS NULL OR lid IS NULL";
                sql = mysql.pool.query(sql, function(error, results, fields) 
                {
                  if (!error)
                  {
                    res.status(202).end();
                  } 
                  else 
                  {
                    res.status(400);
                    res.end();
                  }
                })
            }
        })
    })
    return router;
}();
