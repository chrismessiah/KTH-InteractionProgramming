var buttons = function(view, model) {
  var indexKnapp = view.find(".indexKnapp");
  var foodOption = view.find(".one-meal-clickable");
  var addDishToMenuButton = view.find(".selected-meal-button2");
  var backButton1 = view.find(".back-button1");

  indexKnapp.click(function() {
    view.find("#index").hide();
    view.find("#browse").show();
  });

  foodOption.click(function(something) {
    model.setSelectedDishView(something.currentTarget.id);
    view.find("#browse").hide();
    view.find("#meal").show();
  });


  addDishToMenuButton.click(function() {
    model.addDishToMenu(model.selectedMeal);
  });

  backButton1.click(function() {
    view.find("#meal").hide();
    view.find("#browse").show();
    model.notifyObservers();
    foodOption = view.find(".one-meal");
  });



};
