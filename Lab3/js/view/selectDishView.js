var selectDishView = function (container, model) {
  this.container = container;
  this.model = model;
  model.addObserver(this);

  this.searchBarObj = container.find('#search-bar-1');
  this.searchBarMealTypeObj = container.find('#search-bar-type-1');

  this.update = function() {
    var dish;
    toAppend = '';
    for (var i = 0; i < model.showMeals.length; i++) {
      dish = model.showMeals[i];
      extraclass = 'a' + dish.id;

      if (i === 0) {
        toAppend = toAppend + '<div class="row">';

      }

      toAppend = toAppend + '<div class="col-md-2 one-meal" id="' + dish.id + '">';
      toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
      toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
      toAppend = toAppend + '<p class="text-center black">' + dish.name + '</p>';
      toAppend = toAppend + '</div></div>';
      toAppend = toAppend + '<p class="black">'+ dish.description.substring(0,40) +'...</p></div>';

      toAppend = toAppend + '<style>';
      toAppend = toAppend + '.' + extraclass + '{background-image: url("./images/'+ dish.image +'");}';
      toAppend = toAppend + '</style>';
      if (i === 5) {
        toAppend = toAppend + '</div><div class="row">';
      }
      if (i === (model.showMeals.length-1)) {
        toAppend = toAppend + '</div>';
      }
    }


    container.find("#meal-container").html(toAppend);
  }

  this.update()

};
