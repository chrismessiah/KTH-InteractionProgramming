var mealView = function (container, model) {
  model.addObserver(this, "meal");

  this.container = container;
  this.model = model;
  var amountOfGuests, meal;

  this.update = function(data) {
    meal = model.serverIdResponse;
    amountOfGuests = model.guestNum;
    toAppend = '';

    container.find('.meal-title').html(meal["Title"]);
    container.find('.meal-img').css("background-image","url('" + meal["HeroPhotoUrl"] + "')");
    if (meal["Description"] != "") {
      container.find('.meal-desc2').html(meal["Description"]);
    }
    container.find('.cook').html(meal["Instructions"]);
    container.find('.top-desc').html("Ingredient for " + amountOfGuests + " people");


    var ingredientList = meal['Ingredients'];
    var ingredient = '';
    var totalPrice = 0;
    for (var i = 0; i < ingredientList.length; i++) {
      ingredient = ingredientList[i]
      toAppend = toAppend + '<div class="row">';
        toAppend = toAppend + '<div class="col-xs-2 pricen"><p>' + (Math.round(ingredient['MetricQuantity']*amountOfGuests*100))/100 + ' ' + ingredient['MetricUnit'] + '</p></div>';
        toAppend = toAppend + '<div class="col-xs-6"><p>' + ingredient['Name'] + '</p></div>';
        toAppend = toAppend + '<div class="col-xs-1"><p>SEK</p></div>';

        // NO PRICE WAS GIVEN
        toAppend = toAppend + '<div class="col-xs-1"><p>' + 1*amountOfGuests + '</p></div>';
      toAppend = toAppend + '</div>';
      totalPrice += 1*amountOfGuests;
    }
    container.find("#insert-ingredients-here").html(toAppend);
    container.find(".totalpris123").html(totalPrice);
  }

};
