// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {


  var generateHTML = function(newValue) {
    toAppend = "";
    for (var i = 0; i < newValue.length; i++) {
      toAppend = toAppend + '<div class="row"><div class="col-xs-6"><p class="dishes actual-dish-names' + i + '">' + newValue[i]["Title"].substring(0,30) + '...</p>';
      toAppend = toAppend + '</div><div class="col-xs-6"><p class="prices actual-dish-cost' + i + '">' + Dinner.menuPrice[i] + '</p></div></div>';
    }
    if (toAppend != "") {
      toAppend = toAppend + '<div class="row"><div class="col-xs-6"><p class="dishes">Total Cost</p></div><div class="col-xs-6"><p class="prices total-cost actual-dish-totalCost">' + Dinner.totalMenuPrice + '</p></div></div>';
    }
    return toAppend;
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
          div.innerHTML = html;
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
