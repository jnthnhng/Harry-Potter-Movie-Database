// Select functions to select the ID of the entity based on the selected dropdown

function selectHouse(id){
    $("#house-selector").val(id);
}

function selectCharacter(id){
    $("#character-selector").val(id);
}

function selectGender(id){
    $("#gender-selector").val(id);
}

function selectLocation(id){
    $("#location-selector").val(id);
}

function selectMascot(id){
    $("#mascot-selector").val(id);
}

function selectMovie(id){
    $("#movie-selector").val(id);
}

function selectRace(id){
    $("#race-selector").val(id);
}

function selectLocationType(id){
    $("#location-type-selector").val(id);
}

function selectLocationInMovie(mid, lid){
    $("#location-selector").val(lid);
    $("#movie-selector").val(mid);
}

