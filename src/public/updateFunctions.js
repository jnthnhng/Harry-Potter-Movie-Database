// ajax UPDATE Functions for all pages that contains the feature

function updateHouse(id){
    $.ajax(
    {
        url: '/houses/' + id,
        type: 'PUT',
        data: $('#update-house').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateGender(id){
    $.ajax(
        {
            url: '/genders/' + id,
            type: 'PUT',
            data: $('#update-gender').serialize(),
            success: function(result){
                window.location.replace("./");
            }
        })
};

function updateCharacter(id){
    $.ajax(
    {
        url: '/characters/' + id,
        type: 'PUT',
        data: $('#update-character').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateLocation(id){
    $.ajax(
    {
        url: '/locations/' + id,
        type: 'PUT',
        data: $('#update-location').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateMascot(id){
    $.ajax(
    {
        url: '/mascots/' + id,
        type: 'PUT',
        data: $('#update-mascot').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateRace(id){
    $.ajax(
    {
        url: '/races/' + id,
        type: 'PUT',
        data: $('#update-race').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateMovie(id){
    $.ajax(
    {
        url: '/moives/' + id,
        type: 'PUT',
        data: $('#update-movie').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateLocationType(id){
    $.ajax(
    {
        url: '/locations_types/' + id,
        type: 'PUT',
        data: $('#update-location-type').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateLocationInMovie(lid, mid){
    $.ajax(
    {
        url: '/locations_in_movies/mid/' + mid + '/lid/' + lid,
        type: 'PUT',
        data: $('#update-location-in-movie').serialize(),
        success: function(result){
            window.location = '/locations_in_movies';
            // window.location.replace("./../../../");
        }
    })
};

function updateCharacterMovieAppearances(id){
    $.ajax(
    {
        url: '/character_movie_appearances/' + id,
        type: 'PUT',
        data: $('#update-character-movie-appearances').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};