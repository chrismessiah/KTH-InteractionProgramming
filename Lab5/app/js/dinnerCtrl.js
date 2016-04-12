// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.sidebar = {}
  $scope.sidebar.noMealSelected = true;

  var generateHTML = function(newValue) {
    var mealLoopList = [];
    var mealNames = [];
    for (var i = 0; i < newValue.length; i++) {
      mealLoopList.push(i)
      mealNames.push(newValue[i]["Title"].substring(0,30));
    }
    if (mealLoopList.length === 0) {
      $scope.sidebar.noMealSelected = true;
    } else {
      $scope.sidebar.mealLoopList = mealLoopList;
      $scope.sidebar.mealNames = mealNames;
      $scope.sidebar.menuPrice = Dinner.menuPrice;
      $scope.sidebar.totalMenuPrice = Dinner.totalMenuPrice;
      $scope.sidebar.noMealSelected = false;
    }
    return "";
  }

  $scope.$watch(
    function() {return Dinner.getDishes();},
    function(newValue, oldValue) {
      var div = document.getElementById('actual-meals123');
      if (div) {
        if (newValue.length === 0) {
          div.innerHTML = "<!-- No meals yet! -->";
        } else {
          var html = generateHTML(newValue)
          // div.innerHTML = html;
        }
      }
    }
  , true);

  // NEWVALUE IS A DIGIT NOW!

  // $scope.$watch(
  //   function() {return Dinner.getNumberOfGuests()},
  //   function(newValue, oldValue) {
  //     var div = document.getElementById('actual-meals123');
  //     if (div) {
  //       if (newValue.length === 0) {
  //         div.innerHTML = "<!-- No meals yet! -->";
  //       } else {
  //         var html = generateHTML(newValue)
  //         div.innerHTML = html;
  //       }
  //     }
  //   });



  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.getTotalCost = Dinner.getTotalCost;

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});
