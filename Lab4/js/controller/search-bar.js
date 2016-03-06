var searchBar = function(view, model) {

  var updateShit = function() {
    view.animations.show();
    view.superMealContainer.hide();


    var currentInput = document.getElementById("search-bar-1").value;
    var currentInputType = document.getElementById("search-bar-type-1").value;
    model.getRecipeJsonSearch(currentInput, currentInputType, view.animations, function() {
      setTimeout(function(){
        view.animations.hide();
        view.superMealContainer.show();
      }, 300);
    });
  };

  view.searchButtonPressed.click(function() {
    updateShit();
  });

  view.searchBarEnter.keyup(function(e){
      if(e.keyCode == 13) {updateShit();} // When enter key is pressed on search-bar
  });

};
