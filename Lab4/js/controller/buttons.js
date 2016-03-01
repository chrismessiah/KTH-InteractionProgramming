var buttons = function(view, model) {
  var indexKnapp = view.find(".indexKnapp");
  var foodOption = view.find(".one-meal");
  var addDishToMenuButton = view.find(".selected-meal-button2");
  var backButton1 = view.find(".back-button1");
  var confirmButton = view.find(".confirmKnapp");
  var printButton = view.find("#printKnapp11");
  var backButton2 = view.find("#backKnapp444");
  var backButton3 = view.find("#backotknaoo234");
  var backButton3 = view.find("#backotknaoo234");

  indexKnapp.click(function() {
    view.find("#index").hide();
    view.find("#browse").show();
  });

  // Event handler on mother-div which catches clicks
  $("#meal-container").on("click", ".one-meal", function() {
    model.setSelectedDishView($(this).attr("id"));
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

  confirmButton.click(function() {
    view.find("#meal").hide();
    view.find("#browse").hide();
    view.find("#overview").show();
  });

  printButton.click(function() {
    view.find("#overview").hide();
    view.find("#final").show();
  });

  backButton2.click(function() {
    view.find("#overview").hide();
    view.find("#browse").show();
  });

  backButton3.click(function() {
    view.find("#final").hide();
    view.find("#overview").show();
  });


};
