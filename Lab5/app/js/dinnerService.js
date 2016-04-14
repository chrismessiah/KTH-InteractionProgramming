// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  this.apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP"
  //this.apiKey = "0OV23011kU7B3VVVgxTTTIfdNXeTI3us"
  //this.apiKey = "66J8l00npnHHZcCNLRhxkfW1OHxbojy4"

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1, rpp:25, api_key:this.apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:this.apiKey});


  this.searchResponse = null;
  var cookieArray = [
    ["numberOfGuest", 2], // model-update
    ["noMealSelected", true], // model-update
    ["menuPrice", []], // model-update
    ["totalMenuPrice", 0], // model-update
  ];
  var valueArray = [];
  for (var i = 0; i < cookieArray.length; i++) {
    if ( $cookieStore.get(cookieArray[i][0]) ) {
      valueArray.push($cookieStore.get(cookieArray[i][0]));
    } else {
      valueArray.push(cookieArray[i][1]);
    }
  }

  var numberOfGuest = valueArray[0];
  this.noMealSelected = valueArray[1];
  this.menuPrice = valueArray[2];
  this.totalMenuPrice = valueArray[3];

  var importDishesFromCookies = function() {
    var idArray = $cookieStore.get("chosenDishes");
    var resArray = [];
    var apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP"
    var apiDish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});
    var apiIndex = 0;
    for (var i = 0; i < idArray.length; i++) {
      resArray.push(apiDish.get({id: idArray[i]},
        function() {
          if (apiIndex === idArray.length - 1) {chosenDishes = resArray}
          apiIndex += 1;
        }, function() {swal("Some error occured!");}));
    }
  }

  var chosenDishes = [];
  if ($cookieStore.get("chosenDishes")) {
    importDishesFromCookies()
  }

  var exportDishesAsCookies = function() {
    $cookieStore.remove("chosenDishes");
    var idArray = [];
    for (var i = 0; i < chosenDishes.length; i++) {
      idArray.push(chosenDishes[i]["RecipeID"]);
    }
    $cookieStore.put("chosenDishes", idArray);
  }

  // updates noMealSelected
  this.updateNoMealSelected = function(bool) {
    this.noMealSelected = bool;
    $cookieStore.put("noMealSelected", bool);
  }


  // updates menuPrice, totalMenuPrice
  this.updatePrices = function() {
    this.menuPrice = [];
    this.totalMenuPrice = 0;
    var mealPrice;
    for (var i = 0; i < chosenDishes.length; i++) {
      mealPrice = this.getTotalDishPrice(chosenDishes[i]);
      mealPrice = mealPrice*numberOfGuest
      this.menuPrice.push(mealPrice);
      this.totalMenuPrice += mealPrice;
    }
    $cookieStore.put("menuPrice", this.menuPrice);
    $cookieStore.put("totalMenuPrice", this.totalMenuPrice);

  }

  this.getTotalDishPrice = function(mealObject) {
    var total_price = 0;
    var ingredients = mealObject["Ingredients"];
    for (var i = 0; i < ingredients.length; i++) {total_price += 1;}
    return total_price;
  };

  // updates chosenDishes
  this.addDish = function(mealObj) {
    chosenDishes.push(mealObj);
    exportDishesAsCookies();
    this.updatePrices();
  }

  this.getDishes = function() {
    return chosenDishes;
  }

  // updates chosenDishes
  this.removeDish = function(mealId) {
    var newList = [];
    for (var i = 0; i < chosenDishes.length; i++) {
      if (chosenDishes[i]["RecipeID"] != mealId) {
        newList.push(chosenDishes[i]);
      }
    }
    chosenDishes = newList;
    exportDishesAsCookies();
    this.updatePrices();
  }

  this.dishSelected = function(id) {
    for (var i = 0; i < chosenDishes.length; i++) {
      if (chosenDishes[i]["RecipeID"] == id) {
        return true;
      }
    }
    return false;
  }

  this.searchResult = null;
  this.idResult = null;

  // updates numberOfGuest
  this.setNumberOfGuests = function(num) {
    if (num >= 0) {numberOfGuest = num;}
    $cookieStore.put("numberOfGuest", numberOfGuest);
    this.updatePrices();
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  // this.getTotalCost = function() {
  //   console.log(this.totalCost);
  //   return this.totalCost;
  // }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes)
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
