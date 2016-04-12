// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner, $sce) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  $scope.dish = {};

  var dishId = $routeParams.dishId;
  var res, meal, generatedHTML;

  $scope.addDishToMenu = function() {
    Dinner.addDish(meal);
  }

  var callback = function functionName() {
    var htmlStr = makeHTMLForDish();
    var htmlStrObj = $sce.trustAsHtml(htmlStr);
    $scope.dish.mealObj = htmlStrObj;
  };
  var callbackOnError = function() {
    swal("Some error occured!")
  };

  var makeHTMLForDish = function() {
    amountOfGuests = Dinner.getNumberOfGuests();
    $scope.dish.mealTitle = meal["Title"];
    $scope.dish.photoURL = meal["HeroPhotoUrl"];

    if (meal["Description"] != "") {$scope.dish.mealDescription = meal["Description"];}

    if (meal["Instructions"] === "") {
      $scope.dish.mealInstructions = "No description was given";
    } else {
      $scope.dish.mealInstructions = meal["Instructions"];
    }

    $scope.dish.amountOfGuests = amountOfGuests;

    var ingredientList = meal['Ingredients'];
    $scope.dish.ingredientList = ingredientList;
    var loopList = [];
    for (var i = 0; i < ingredientList.length; i++) {loopList.push(i);}
    $scope.dish.ingredientListLooper = loopList;

    var totalPrice = 0;
    var roundedQuantityList = []
    for (var i = 0; i < ingredientList.length; i++) {
      roundedQuantityList.push((Math.round(ingredientList[i]['MetricQuantity']*amountOfGuests*100))/100);
      totalPrice += amountOfGuests;
    }
    $scope.dish.roundedQuantityList = roundedQuantityList;
    $scope.dish.totalPrice = totalPrice;
  };
  meal = Dinner.Dish.get({id: dishId}, callback, callbackOnError);

});
