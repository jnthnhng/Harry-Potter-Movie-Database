function filterCharactersByHouse() {
    //get the id of the selected house from the filter dropdown
    var house_id = document.getElementById('house_filter').value

    //constructs the URL in special case of 'All' and redirects it
    if (house_id === "All") {
      window.location = '/characters/';
    } else {
      //construct the URL and redirect to it
      window.location = '/characters/filter/' + parseInt(house_id)
    }
}