var searchBar = function(view, model) {

  var updateShit = function() {
    view.animations.show();
    var currentInput = document.getElementById("search-bar-1").value;
    var currentInputType = document.getElementById("search-bar-type-1").value;
    model.getRecipeJsonSearch(currentInput, currentInputType, view.animations, function() {
      $(window).ready(function() {
        setTimeout(function(){
          view.animations.hide();
        }, 1000);
      })
    });
  };

  view.searchButtonPressed.click(function() {
    updateShit();
  });

  view.searchBarEnter.keyup(function(e){
      if(e.keyCode == 13) {updateShit();} // When enter key is pressed on search-bar
  });

};
