// Search controller that we use whenever we have a search inputs
// and search results

// $sce for escaping html
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner, $sce) {
  $scope.search = {};
  $scope.search.loading = false;
  var res, results;

  var updateSearchData = function() {
    if (res["ResultCount"] === 0) {
      swal("No matching results found!");
    } else if (res["StatusCode"] === 400) {
      swal("Error", "Go to dinnerService.js. \n\n" + res["Message"]);
      console.log(res);
    } else {
      Dinner.searchResponse = res;
      results = res["Results"];
      $scope.search.results = results;

      var temp = results.length;
      while (temp % 6 !== 0) {temp += 1}
      var rows = temp / 6;
      var loopArray = [];
      for (var i = 0; i < rows; i++) {loopArray.push(i);}
      $scope.search.loopArray = loopArray;

      var fixedMealArray = [];

      var tempResults = results.slice();
      var tempMeal;
      var tempArray = [];
      var counter = 0;
      for (var i = 0; i < results.length; i++) {
        if (counter === 0) {tempArray = [];}
        tempMeal = tempResults.shift();
        tempArray.push(tempMeal);
        counter += 1;
        if (counter === 6) {counter = 0; fixedMealArray.push(tempArray);}
      }
      if (counter !== 0) {counter = 0; fixedMealArray.push(tempArray);}
      $scope.search.fixedMealArray = fixedMealArray;
    }
    $scope.search.loading = false;
  };

  var callbackOnError = function() {
    swal("Some error occured!")
    console.log(res);
  };

  $scope.makeSearch = function(keyword, category) {

    $scope.search.loading = true;
    if (category) {
      res = Dinner.DishSearch.get({title_kw:keyword, include_primarycat:category}, updateSearchData, callbackOnError);
    } else {
      res = Dinner.DishSearch.get({title_kw:keyword}, updateSearchData, callbackOnError);
    }
  }

  $scope.makeIdFetch = function (id) {
    Dinner.idResult = Dinner.Dish.get({id:id});
  }

  if (Dinner.searchResponse && window.location.href.indexOf("#/search") > -1) {
    res = Dinner.searchResponse;
    updateSearchData();
  }

});
