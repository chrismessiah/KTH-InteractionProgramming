// Search controller that we use whenever we have a search inputs
// and search results

// $sce for escaping html
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner, $sce) {
  // creating objects for scope-reference
  $scope.search = {};

  // watch-function to sync data between diffrent partials
  var listener = $scope.$watch(
    function($scope) {return $scope.search.mealSearchResponse;},
    function(newValue, oldValue) {
      var elem = document.getElementById("meal-container");
      if (elem) {elem.innerHTML = newValue;}
    }
  );
  //var headScope = $scope;

  $scope.makeSearch = function(keyword, category) {
    var res, results;

    var callback = function() {
      if (res["ResultCount"] === 0) {
        swal("No matching results found!");
      } else if (res["StatusCode"] === 400) {
        swal("Error", "Go to dinnerService.js. \n\n" + res["Message"]);
        console.log(res);
      } else {
        results = res["Results"];
        $scope.search.results = results;
        //var htmlStr = makeHTMLForMeals(results);


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



        //htmlStr = $sce.trustAsHtml(htmlStr);
        //$scope.search.mealSearchResponse = htmlStr;
      }
    };

    var callbackOnError = function() {
      swal("Some error occured!")
      console.log(res);
    };

    if (category) {
      res = Dinner.DishSearch.get({title_kw:keyword, include_primarycat:category}, callback, callbackOnError);
    } else {
      res = Dinner.DishSearch.get({title_kw:keyword}, callback, callbackOnError);
    }
  }

  // var makeHTMLForMeals = function(searchResult) {
  //   var dish;
  //   var toAppend = '';
  //   var counter = 0;
  //
  //   for (var i = 0; i < searchResult.length; i++) {
  //     dish = searchResult[i];
  //     extraclass = 'a' + dish["RecipeID"];
  //
  //   }
  //   return toAppend;
  // }

  $scope.makeIdFetch = function (id) {
    Dinner.idResult = Dinner.Dish.get({id:id});
  }


  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

});
