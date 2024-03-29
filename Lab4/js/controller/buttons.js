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
  var ani = view.find(".anim-load2");
  var meal = view.find("#selected-meal-container");

  indexKnapp.click(function() {
    view.find("#index").hide();
    view.find("#browse").show();
  });

  // Event handler on mother-div which catches clicks
  $("#meal-container").on("click", ".one-meal", function() {
    meal.hide()
    ani.show();
    model.setSelectedDishView($(this).attr("id"), function() {
      setTimeout(function(){
        ani.hide();
        meal.show();
      }, 100);
    });
    view.find("#browse").hide();
    view.find("#meal").show();
  });

  $("#insert-matkontainer-here").on("click", ".one-meal", function(foo) {
    model.removeDishFromMenuById($(this).attr("id"));
    if (model.chosenMeal.length === 0) {
      view.find("#overview").hide();
      view.find("#browse").show()
      swal({
        title: "No meals left!",
        text: "Returning to meal selection.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });


  addDishToMenuButton.click(function() {
    var foundMeal = false;
    var foundCategory = false;
    var collisionCategory = "";
    for (var i = 0; i < model.chosenMeal.length; i++) {

      if (model.serverIdResponse["RecipeID"] === model.chosenMeal[i]["RecipeID"]) {
        foundMeal = true;
        break;
      }
      if (model.serverIdResponse["Category"] === model.chosenMeal[i]["Category"] && model.chosenMeal[i]["Category"] !== null) {
        foundCategory = true;
        collisionCategory = model.chosenMeal[i]["Category"];
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
        text: `You have already selected a/an ${collisionCategory}! Would you like to change it to this one instead?`,
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
