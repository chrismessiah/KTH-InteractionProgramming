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
    console.log("ran");
    var foundMeal = false;
    var foundCategory = false;
    for (var i = 0; i < model.chosenMeal.length; i++) {
      console.log("entered for loop");
      if (model.serverIdResponse["RecipeID"] === model.chosenMeal[i]["RecipeID"]) {
        foundMeal = true;
        break;
      }
      console.log(model.serverIdResponse["Category"]);
      console.log(model.serverIdResponse);
      console.log(model.chosenMeal[i]["Category"]);
      console.log(model.chosenMeal[i]);
      if (model.serverIdResponse["Category"] === model.chosenMeal[i]["Category"] && model.chosenMeal[i]["Category"] !== null) {
        foundCategory = true;
        var dishToRemove = model.chosenMeal[i];
      }
    }

    // Meal already selected
    if (foundMeal) {
      swal({
        title: "Wait a minute...",
        text: "You have already selected this meal!",
        type: "warning",
        confirmButtonText: "Oh okay!",
      });
    }
    // Meal category already selected
    else if (foundCategory) {
      swal({
        title: "Wait a minute...",
        text: `You have already selected a/an ${model.selectedMeal['Category']}! Would you like to change it to this one instead?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes please!",
        cancelButtonText: "No, thank you.",
      },function(isConfirm){
        if (isConfirm) {
          model.removeDishFromMenu(dishToRemove);
          model.addDishToMenu();
        }});
    } else {
      model.addDishToMenu();
    }
  });

  backButton1.click(function() {
    view.find("#meal").hide();
    view.find("#browse").show();
    foodOption = view.find(".one-meal");
  });

  confirmButton.click(function() {
    if (model.chosenMeal.length === 0) {
      swal({
        title: "Wait a minute...",
        text: "You haven't chosen any meals yet!",
        type: "warning",
        confirmButtonText: "Oh okay!",
      });
    } else {
      view.find("#meal").hide();
      view.find("#browse").hide();
      view.find("#overview").show();
    }
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
