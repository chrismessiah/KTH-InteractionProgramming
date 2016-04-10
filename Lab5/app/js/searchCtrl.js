// Search controller that we use whenever we have a search inputs
// and search results

// $sce for escaping html
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner, $sce) {
  $scope.mealSearchResponse = "";

  // watch-function to sync data between diffrent partials
  var listener = $scope.$watch(
    function($scope) {return $scope.mealSearchResponse;},
    function(newValue, oldValue) {
      var elem = document.getElementById("meal-container");
      if (elem) {elem.innerHTML = newValue;}
    }
  );
  var headScope = $scope;

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
        var htmlStr = makeHTMLForMeals(results);
        htmlStr = $sce.trustAsHtml(htmlStr);
        headScope.mealSearchResponse = htmlStr;
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

  var makeHTMLForMeals = function(searchResult) {
    var dish;
    var toAppend = '';
    var counter = 0;

    for (var i = 0; i < searchResult.length; i++) {
      dish = searchResult[i];
      extraclass = 'a' + dish["RecipeID"];

      if (counter === 0) {toAppend = toAppend + '<div class="row">';}
      toAppend = toAppend + '<a href="#/dish/' + dish["RecipeID"] + '">';
      toAppend = toAppend + '<div class="col-md-2 one-meal" id="' + dish["RecipeID"] + '">';
      toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
      toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
      toAppend = toAppend + '<p class="text-center black">' + dish["Title"] + '</p>';
      toAppend = toAppend + '</div></div>';
      toAppend = toAppend + '<style>';
      toAppend = toAppend + '.' + extraclass + '{background-image: url("'+ dish["HeroPhotoUrl"] +'");}';
      toAppend = toAppend + '</style></div>';
      toAppend = toAppend + '</a>';

      counter += 1;
      if (counter === 6) {counter = 0; toAppend = toAppend + '</div>';}
    }
    return toAppend;
  }

  $scope.makeIdFetch = function (id) {
    Dinner.idResult = Dinner.Dish.get({id:id});
  }


  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

});
