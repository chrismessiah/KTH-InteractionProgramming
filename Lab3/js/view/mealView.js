var mealView = function (container, model) {
  model.addObserver(this);

  this.container = container;
  this.model = model;
  var amountOfGuests, meal;

  this.update = function() {

    meal = model.getSelectedDishView();
    console.log(meal.name);

    amountOfGuests = model.guestNum;
    toAppend = '';
    toAppend = toAppend + '<div id="selected-meal-container"><div class="col-md-6 selected-meal-one">';
    toAppend = toAppend + '<p class="meal-title">' + meal.name + '</p><div class="meal-img"></div>';
    toAppend = toAppend + '<style>.meal-img{background-image: url("./images/' + meal.image + '")}</style>';
    toAppend = toAppend + '<p class="meal-desc">' + meal.description + '</p><div class="center"><input class="selected-meal-button btnMe wide-button" type="submit" value="Back"/></div>';
    toAppend = toAppend + '<p class="meal-title">Preparation</p>';
    toAppend = toAppend + '<p class="meal-desc">' + 'No description was given' + '</p></div>';
    toAppend = toAppend + '<div class="col-md-6"><div class="row ingredients-container"><div class="center">';
    toAppend = toAppend + '<p class="top-desc">Ingredient for ' + amountOfGuests + ' people</p>';
    toAppend = toAppend + '<div class="separator"></div></div>';


    var ingredientList = meal['ingredients'];
    var ingredient = '';
    var totalPrice = 0;
    for (var i = 0; i < ingredientList.length; i++) {
      ingredient = ingredientList[i]
      toAppend = toAppend + '<div class="row">';
      toAppend = toAppend + '<div class="col-md-2 pricen"><p>' + (Math.round(ingredient['quantity']*amountOfGuests*100))/100 + ' ' + ingredient['unit'] + '</p></div>';
      toAppend = toAppend + '<div class="col-md-6"><p>' + ingredient['name'] + '</p></div>';
      toAppend = toAppend + '<div class="col-md-1"><p>SEK</p></div>';
      toAppend = toAppend + '<div class="col-md-1"><p>' + ingredient['price']*amountOfGuests + '</p></div></div>';
      totalPrice += ingredient['price']*amountOfGuests;
    }


    toAppend = toAppend + '<div class="center"><div class="separator"></div></div>';
    toAppend = toAppend + '<div class="row"><div class="col-md-5"><input class="selected-meal-button2 btnMe wide-button" type="submit" value="Confirm"/></div>';
    toAppend = toAppend + '<div class="col-md-1 a-bit-down"><p>SEK</p></div>';
    toAppend = toAppend + '<div class="col-md-1 a-bit-down"><p>' + totalPrice + '</p></div></div></div></div>';
    container.find("#selected-meal-container").html(toAppend);
  }



};
