var selectDishView = function (container, model) {
  this.container = container;
  this.model = model;
  model.addObserver(this);

  this.searchBarObj = container.find('#search-bar-1');
  this.searchBarMealTypeObj = container.find('#search-bar-type-1');
  this.mealContainers = container.find(".one-meal");

  this.update = function() {
    var dish;
    var toAppend = '';
    for (var i = 0; i < model.showMeals.length; i++) {
      if (i >= this.mealContainers.length) {
        container.find(this.mealContainers[i]).html("");
      } else {
        dish = model.showMeals[i];
        extraclass = 'a' + dish.id;
        toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
        toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
        toAppend = toAppend + '<p class="text-center black">' + dish.name + '</p>';
        toAppend = toAppend + '</div></div>';
        toAppend = toAppend + '<p class="black">'+ dish.description.substring(0,40) +'...</p></div>';

        toAppend = toAppend + '<style>';
        toAppend = toAppend + '.' + extraclass + '{background-image: url("./images/'+ dish.image +'");}';
        toAppend = toAppend + '</style>';
        container.find(this.mealContainers[i]).html(toAppend);
        container.find(this.mealContainers[i]).attr("id",dish.id);
        container.find(this.mealContainers[i]).addClass("one-meal-clickable");
        toAppend = '';
      }
    }
  }

  this.update()

};
