
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner, $sce, $window) {
  $scope.object = {};
  $scope.object.dish = {};
  $scope.object.sidebar = {};
  $scope.object.sidebar.noMealSelected = Dinner.noMealSelected;
  $scope.object.sidebar.updateNoMealSelected = Dinner.updateNoMealSelected;
  $scope.object.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.object.getTotalCost = Dinner.getTotalCost;
  $scope.object.navbar = {};
  $scope.object.overview = {};
  $scope.object.final = {};

  $scope.$watch(
    function() {return Dinner.getDishes();},
    function() {updateMenuData();},
    true)

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
    this.object.navbar.loading = true;
    meal = Dinner.Dish.get({id: getDishId()}, updateSelectedDishData, function() {swal("Some error occured!");});
  };

  $scope.addDishToMenu = function() {
    if (Dinner.dishSelected(meal["RecipeID"])) {
      swal("Meal already selected!")
    } else {
      Dinner.addDish(meal);
      updateMenuData();
    }
  };

  var updateMenuData = function() {
    var newDishes = Dinner.getDishes();
    if (newDishes.length === 0) {
      $scope.object.sidebar.updateNoMealSelected(true);
      Dinner.updateNoMealSelected(true);
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
      $scope.object.sidebar.updateNoMealSelected(false);
      Dinner.updateNoMealSelected(false);
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

  $scope.checkIfMenuIsEmpty = function(results, redirect) {
    if (results.length === 0) {
      swal("No meals left, returning to meal selection.")
      $window.location.href = redirect;
    }
  }

  $scope.generateOverviewStructures = function() {
    var results = Dinner.getDishes();
    this.checkIfMenuIsEmpty(results,'#/search')

    var temp = results.length;
    while (temp % 6 !== 0) {temp += 1}
    var rows = temp / 6;
    var loopArray = [];
    for (var i = 0; i < rows; i++) {loopArray.push(i);}
    $scope.object.overview.loopArray = loopArray;

    var priceList = Dinner.menuPrice;
    var tempResults = results.slice();
    var tempMeal;
    var tempArray = [];
    var counter = 0;
    var fixedMealArray = [];
    for (var i = 0; i < results.length; i++) {
      if (counter === 0) {tempArray = [];}
      tempMeal = tempResults.shift();
      tempArray.push([tempMeal, priceList[i]]);
      counter += 1;
      if (counter === 6) {counter = 0; fixedMealArray.push(tempArray);}
    }
    if (counter !== 0) {counter = 0; fixedMealArray.push(tempArray);}
    $scope.object.overview.fixedMealArray = fixedMealArray;
  }

  var deleteMeal = function(id) {
    Dinner.removeDish(id);
    $scope.generateOverviewStructures();
  }

  $scope.deleteMealFromOverview = function($event){
    var mealId = $event.target.className.split(" ")[1].substring(1);
    deleteMeal(mealId);
  }

  $scope.generateFinalViewStructures = function() {
    var results = Dinner.getDishes();
    this.checkIfMenuIsEmpty(results, '#/search');
    var mealList = Dinner.getDishes();
    var meal, mealInstruc, mealDesc;
    var looperList = [];

    for (var i = 0; i < mealList.length; i++) {
      meal = mealList[i];
      mealDesc = "No description was given.";
      if (meal["Description"] != "") {mealDesc = meal["Description"];}

      mealInstruc = "No instruction was given.";
      if (meal["Instructions"] != "") {mealInstruc = meal["Instructions"];}

      looperList.push([meal, mealDesc, mealInstruc]);
    }
    $scope.object.final.looperList = looperList;
  }

  if (Dinner.noMealSelected === false) {
    updateMenuData();
  }

});
