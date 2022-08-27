// Ajax delete functions for pages that contains the feature

function deleteGender(id) {
  $.ajax({
    url: '/genders/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteCharacter(id) {
  $.ajax({
    url: '/characters/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location = '/characters';
    }
  })
};

function deleteCharacterMovieAppearance(cid, mid) {
  $.ajax({
    url: '/character_movie_appearances/cid/' + cid + '/mid/' + mid,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteHouse(id) {
  $.ajax({
    url: '/houses/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteLocationType(id) {
  $.ajax({
    url: '/locations_types/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteLocation(id) {
  $.ajax({
    url: '/locations/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteLocationInMovie(mid, lid) {
  $.ajax({
    url: '/locations_in_movies/mid/' + mid + '/lid/' + lid,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteMascot(id) {
  $.ajax({
    url: '/mascots/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteMovie(id) {
  $.ajax({
    url: '/movies/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};

function deleteRace(id) {
  $.ajax({
    url: '/races/' + id,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  })
};
