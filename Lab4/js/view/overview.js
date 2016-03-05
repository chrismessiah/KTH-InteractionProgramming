var overview = function (container, model) {
  model.addObserver(this, "overview");
  this.container = container;
  this.model = model;

  this.update = function(data) {
    container.find("#line1").html('My Dinner: ' + model.guestNum + ' people');
    list = model.chosenMeal;
    var toAppend = '';
    var meal;
    var totalPrice = 0;

    for (var i = 0; i < list.length; i++) {
      dish = list[i];
      extraclass = 'a' + dish["RecipeID"];

      toAppend = toAppend + '<div class="col-xs-2 one-meal">';
      toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
      toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
      toAppend = toAppend + '<p class="text-center black">' + dish["Title"] + '</p>';
      toAppend = toAppend + '</div></div><p class="pricetag">' + model.getTotalDishPriceWithRespectToGuestAmount(dish) + ' SEK</p>'
      toAppend = toAppend + '</div>';

      toAppend = toAppend + '<style>';
      toAppend = toAppend + '.' + extraclass + '{background-image: url("'+ dish["HeroPhotoUrl"] +'");}';
      toAppend = toAppend + '</style>';
      totalPrice += model.getTotalDishPriceWithRespectToGuestAmount(dish);
    }
    container.find("#pris123432").html("Total:<br>" + totalPrice + " SEK");
    container.find("#insert-matkontainer-here").html(toAppend);
  }

};
