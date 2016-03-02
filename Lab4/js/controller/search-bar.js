var searchBar = function(view, model) {

  var updateShit = function() {
    var currentInput = document.getElementById("search-bar-1").value;
    var currentInputType = document.getElementById("search-bar-type-1").value;
    model.getRecipeJsonSearch(currentInput, currentInputType);
  };

  view.searchButtonPressed.click(function() {
    updateShit();
  });

  view.searchBarEnter.keyup(function(e){
      if(e.keyCode == 13) {updateShit();} // When enter key is pressed on search-bar
  });

};
