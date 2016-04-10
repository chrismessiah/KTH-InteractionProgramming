// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  this.apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP"
  //this.apiKey = "0OV23011kU7B3VVVgxTTTIfdNXeTI3us"
  //this.apiKey = "66J8l00npnHHZcCNLRhxkfW1OHxbojy4"

  var numberOfGuest = 2
  var totalCost = 0;

  var chosenDishes = [];

  this.addDish = function(mealObj) {
    chosenDishes.push(mealObj);
    console.log("Added dish to menu");
  }

  this.removeDish = function(mealId) {
    var newList = [];
    chosenDishes.push(mealObj);
    for (var i = 0; i < chosenDishes.length; i++) {
      if (chosenDishes[i]["RecipeID"] !== mealId) {
        newList.push(chosenDishes[i]);
      }
    }
    chosenDishes = newList;
  }

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1, rpp:25, api_key:this.apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:this.apiKey});

  this.searchResult = null;
  this.idResult = null;

  this.setNumberOfGuests = function(num) {
    if (num >= 0) {
      numberOfGuest = num;
    }
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  this.getTotalCost = function() {
    return totalCost;
  }


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
