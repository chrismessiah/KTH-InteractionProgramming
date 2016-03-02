var searchBar = function(view, model) {

  var updateShit = function() {
    var currentInput = document.getElementById("search-bar-1").value;
    var currentInputType = document.getElementById("search-bar-type-1").value;
    var meal;
    model.getRecipeJsonSearch(currentInput);
    if (currentInputType !== "All") {
      for (var i = 0; i < model.dishes.length; i++) {
        meal = model.dishes[i]
        if (meal["Category"] !== currentInputType) {
          model.removeDishFromSelection(meal["RecipeID"]);
        }
      }
    }
  };

  view.searchButtonPressed.click(function() {
    updateShit();
  });

  view.searchBarEnter.keyup(function(e){
      if(e.keyCode == 13) {updateShit();} // When enter key is pressed on search-bar
  });

};
