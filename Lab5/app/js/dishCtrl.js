// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner, $sce) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  var dishId = $routeParams.dishId;
  var res, meal, generatedHTML;

  $scope.addDishToMenu = function() {
    Dinner.addDish(meal);
  }

  $scope.$watch(
    function($scope) {return $scope.ingredientHTML;},
    function(newValue, oldValue) {
      var elem = document.getElementById("insert-ingredients-here");
      if (elem) {elem.innerHTML = newValue;}
    }
  );

  var headScope = $scope;

  var callback = function functionName() {
    var htmlStr = makeHTMLForDish();
    var htmlStrObj = $sce.trustAsHtml(htmlStr);
    headScope.mealObj = htmlStrObj;
  };
  var callbackOnError = function() {
    swal("Some error occured!")
  };

  var makeHTMLForDish = function() {
    amountOfGuests = Dinner.getNumberOfGuests();
    toAppend = '';
    headScope.mealTitle = meal["Title"];
    headScope.photoURL = meal["HeroPhotoUrl"];

    if (meal["Description"] != "") {headScope.mealDescription = meal["Description"];}

    if (meal["Instructions"] === "") {
      headScope.mealInstructions = "No description was given";
    } else {
      headScope.mealInstructions = meal["Instructions"];
    }

    headScope.amountOfGuests = amountOfGuests;

    var ingredientList = meal['Ingredients'];
    var ingredient = '';
    var totalPrice = 0;
    for (var i = 0; i < ingredientList.length; i++) {
      ingredient = ingredientList[i]
      toAppend = toAppend + '<div class="row">';
        toAppend = toAppend + '<div class="col-xs-2 pricen"><p>' + (Math.round(ingredient['MetricQuantity']*amountOfGuests*100))/100 + ' ' + ingredient['MetricUnit'] + '</p></div>';
        toAppend = toAppend + '<div class="col-xs-6"><p>' + ingredient['Name'] + '</p></div>';
        toAppend = toAppend + '<div class="col-xs-1"><p>SEK</p></div>';

        toAppend = toAppend + '<div class="col-xs-1"><p>' + 1*amountOfGuests + '</p></div>';
      toAppend = toAppend + '</div>';
      totalPrice += 1*amountOfGuests;
    }

    headScope.ingredientHTML = toAppend;
    headScope.totalPrice = totalPrice;
  };
  meal = Dinner.Dish.get({id: dishId}, callback, callbackOnError);

});
