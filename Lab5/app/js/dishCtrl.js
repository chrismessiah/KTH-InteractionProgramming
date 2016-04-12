
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner, $sce) {
  $scope.object = {};
  $scope.object.dish = {};
  $scope.object.sidebar = {};
  $scope.object.sidebar.noMealSelected = Dinner.noMealSelected;
  $scope.object.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.object.getTotalCost = Dinner.getTotalCost;

  var meal;

  var updateSelectedDishData = function() {
    $scope.object.dish.mealTitle = meal["Title"];
    $scope.object.dish.photoURL = meal["HeroPhotoUrl"];

    if (meal["Description"] != "") {$scope.object.dish.mealDescription = meal["Description"];}

    if (meal["Instructions"] === "") {
      $scope.object.dish.mealInstructions = "No description was given";
    } else {
      $scope.object.dish.mealInstructions = meal["Instructions"];
    }

    var ingredientList = meal['Ingredients'];
    $scope.object.dish.ingredientList = ingredientList;
    var loopList = [];
    for (var i = 0; i < ingredientList.length; i++) {loopList.push(i);}
    $scope.object.dish.ingredientListLooper = loopList;

    var totalPrice = 0;
    var roundedQuantityList = [];
    var numberOfGuests = Dinner.getNumberOfGuests();
    for (var i = 0; i < ingredientList.length; i++) {
      roundedQuantityList.push((Math.round(ingredientList[i]['MetricQuantity']*numberOfGuests*100))/100);
      totalPrice += numberOfGuests;
    }
    $scope.object.dish.roundedQuantityList = roundedQuantityList;
    $scope.object.dish.totalPrice = totalPrice;
  };

  var getDishId = function() {
    return $routeParams.dishId;
  };

  $scope.getDishFromAPI = function() {
    meal = Dinner.Dish.get({id: getDishId()}, updateSelectedDishData, function() {swal("Some error occured!");});
  };

  $scope.addDishToMenu = function() {
    Dinner.addDish(meal);
    updateMenuData();
  };

  var updateMenuData = function() {
    var newDishes = Dinner.getDishes();
    if (newDishes.length === 0) {
      $scope.object.sidebar.noMealSelected = true;
      Dinner.noMealSelected = true;
    } else {
      var mealLoopList = [];
      var mealNames = [];
      for (var i = 0; i < newDishes.length; i++) {
        mealLoopList.push(i)
        mealNames.push(newDishes[i]["Title"].substring(0,30));
      }
      $scope.object.sidebar.mealLoopList = mealLoopList;
      $scope.object.sidebar.mealNames = mealNames;
      $scope.object.sidebar.menuPrice = Dinner.menuPrice;
      $scope.object.sidebar.totalMenuPrice = Dinner.totalMenuPrice;
      $scope.object.sidebar.noMealSelected = false;
      Dinner.noMealSelected = false;
    }
  };

  var updateNumberOfGuest = function(num){
    Dinner.setNumberOfGuests($scope.object.numberOfGuests + num);
    $scope.object.numberOfGuests = Dinner.getNumberOfGuests();
    updateMenuData();
    if (window.location.href.indexOf("#/dish/") > -1) {
      updateSelectedDishData();
    }
  };

  $scope.increaseNumberOfGuest = function(){
    updateNumberOfGuest(1);
  }

  $scope.decreaseNumberOfGuest = function(){
    updateNumberOfGuest(-1);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  if (Dinner.noMealSelected === false) {
    updateMenuData();
  }

});
