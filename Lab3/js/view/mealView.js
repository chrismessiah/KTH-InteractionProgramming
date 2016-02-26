var mealView = function (container, model) {
  model.addObserver(this);

  this.container = container;
  this.model = model;
  var amountOfGuests, meal;

  this.update = function() {

    meal = model.getSelectedDishView();
    amountOfGuests = model.guestNum;
    toAppend = '';

    container.find('.meal-title').html(meal.name);
    container.find('.meal-img').css("background-image","url('./images/" + meal.image + "')");
    container.find('.meal-desc').html(meal.description);
    container.find('.top-desc').html("Ingredient for " + amountOfGuests + " people");


    var ingredientList = meal['ingredients'];
    var ingredient = '';
    var totalPrice = 0;
    for (var i = 0; i < ingredientList.length; i++) {
      ingredient = ingredientList[i]
      toAppend = toAppend + '<div class="row">';
        toAppend = toAppend + '<div class="col-md-2 pricen"><p>' + (Math.round(ingredient['quantity']*amountOfGuests*100))/100 + ' ' + ingredient['unit'] + '</p></div>';
        toAppend = toAppend + '<div class="col-md-6"><p>' + ingredient['name'] + '</p></div>';
        toAppend = toAppend + '<div class="col-md-1"><p>SEK</p></div>';
        toAppend = toAppend + '<div class="col-md-1"><p>' + ingredient['price']*amountOfGuests + '</p></div>';
      toAppend = toAppend + '</div>';
      totalPrice += ingredient['price']*amountOfGuests;
    }
    container.find("#insert-ingredients-here").html(toAppend);
    container.find(".totalpris123").html(totalPrice);
  }

  this.update()

};
