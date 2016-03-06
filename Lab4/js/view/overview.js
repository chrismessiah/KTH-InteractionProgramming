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
    var counter = 0;

    for (var i = 0; i < list.length; i++) {
      dish = list[i];
      extraclass = 'a' + dish["RecipeID"];

      if (counter == 0) {
        toAppend = toAppend + '<div class="row">';
      }

      toAppend = toAppend + '<div id="' + dish["RecipeID"] + '" class="col-xs-2 one-meal one-meal-overview">';
      toAppend = toAppend + '<div class="remove-icon"></div>'
      toAppend = toAppend + '<div class="meal-pic ' + extraclass + ' blur-this"></div>';
      toAppend = toAppend + '<div class="meal-name-box blur-this"><div class="center">';
      toAppend = toAppend + '<p class="text-center black">' + dish["Title"] + '</p>';
      toAppend = toAppend + '</div></div><p class="pricetag">Price: ' + model.getTotalDishPriceWithRespectToGuestAmount(dish) + ' SEK</p>'
      toAppend = toAppend + '</div>';

      toAppend = toAppend + '<style>';
      toAppend = toAppend + '.' + extraclass + '{background-image: url("'+ dish["HeroPhotoUrl"] +'");}';
      toAppend = toAppend + '</style>';
      totalPrice += model.getTotalDishPriceWithRespectToGuestAmount(dish);

      counter += 1;

      if (counter == 6) {
        toAppend = toAppend + '</div>';
        counter = 0;
      }

    }
    container.find("#pris123432").html("Total:<br>" + totalPrice + " SEK");
    container.find("#insert-matkontainer-here").html(toAppend);
  }

};
