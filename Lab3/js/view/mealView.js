var mealView = function (container, model) {
  this.container = container;
  this.model = model;
  model.addObserver(this);
  var meal = model.getSelectedDishView();
  var amountOfGuests;


  container.find("#page-head").append('<div class="row header"><h2>HOMELETTE</h2><h4>From the best chefs in the world directly into your kitchen!</h4></div><style type="text/css">body {margin: 0px;}.header, .footer {background-color: #191919;}.header > h2, .header > h4, .footer > h4 {position: relative;display: inline-block;left: 20px;font-family: "Gill Sans";color: white;}.header > h2 {margin-top: 10px;}.header > h4 {left: 40px;}</style>');
  container.find("#page-foot").append('<div class="row footer"><h4>Made by Christian and Adelina</h2></div>');

  this.update = function() {
    amountOfGuests = model.guestNum;
    toAppend = '';
    toAppend = toAppend + '<div id="selected-meal-container"><div class="col-md-6 selected-meal-one">';
    toAppend = toAppend + '<p class="meal-title">' + meal.name + '</p><div class="meal-img"></div>';
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

  this.update();

};
