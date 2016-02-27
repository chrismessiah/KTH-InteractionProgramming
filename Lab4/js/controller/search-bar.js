var searchBar = function(view, model) {

  var updateShit = function() {
    var currentInput = document.getElementById("search-bar-1").value;
    var currentInputType = document.getElementById("search-bar-type-1").value;
    var meal;

    model.resetSelection();
    for (var i = 0; i < model.dishes.length; i++) {
      meal = model.dishes[i]
      if (currentInputType !== "All") {
        if (meal.type !== currentInputType.toLowerCase() || meal.name.toLowerCase().indexOf(currentInput.toLowerCase()) === -1) {
          model.removeDishFromSelection(meal.id);
        }
      } else {
        if (meal.name.toLowerCase().indexOf(currentInput.toLowerCase()) === -1) {
          model.removeDishFromSelection(meal.id);
        }
      }
    }


  };

  view.searchBarObj.keyup(function() {
    updateShit();
  });

  view.searchBarMealTypeObj.change(function() {
    updateShit();
  });


  // view.searchBarMealType

};
