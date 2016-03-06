var selectDishView = function (container, model) {
  this.container = container;
  this.model = model;
  model.addObserver(this, "select");

  this.searchButtonPressed = container.find('.search-button-pressed');
  this.searchBarEnter = container.find('#search-bar-1');
  this.mealContainers = container.find(".one-meal");
  this.animations = container.find(".anim-load");
  this.superMealContainer = container.find("#meal-container");

  this.update = function(data) {
    var dish, currentDishContainer;
    var toAppend = '';
    var counter = 0;
     for (var i = 0; i < model.showMeals.length; i++) {
       dish = model.showMeals[i];
       extraclass = 'a' + dish["RecipeID"];

       if (counter === 0) {toAppend = toAppend + '<div class="row">';}
       toAppend = toAppend + '<div class="col-md-2 one-meal" id="' + dish["RecipeID"] + '">';
       toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
       toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
       toAppend = toAppend + '<p class="text-center black">' + dish["Title"] + '</p>';
       toAppend = toAppend + '</div></div>';
       toAppend = toAppend + '<style>';
       toAppend = toAppend + '.' + extraclass + '{background-image: url("'+ dish["HeroPhotoUrl"] +'");}';
       toAppend = toAppend + '</style></div>';

       counter += 1;
       if (counter === 6) {counter = 0; toAppend = toAppend + '</div>';}
     }
     container.find("#meal-container").html(toAppend);
   }
};
