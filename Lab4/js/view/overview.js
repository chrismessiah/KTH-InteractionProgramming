var overview = function (container, model) {
  model.addObserver(this);
  this.container = container;
  this.model = model;

  this.update = function(data) {
    container.find("#line1").html('My Dinner: ' + model.guestNum + ' people');
    list = model.getSelectedMenu();
    var toAppend = '';
    var meal;
    toAppend = toAppend + '<div class="col-xs-3"></div>';
    var totalPrice = 0;

    for (var i = 0; i < list.length; i++) {
      dish = list[i];
      extraclass = 'a' + dish.id;

      toAppend = toAppend + '<div class="col-xs-2 one-meal">';
      toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
      toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
      toAppend = toAppend + '<p class="text-center black">' + dish.name + '</p>';
      toAppend = toAppend + '</div></div><p class="pricetag">' + model.getTotalDishPrice(dish.id)*model.guestNum + ' SEK</p>'
      toAppend = toAppend + '</div>';

      toAppend = toAppend + '<style>';
      toAppend = toAppend + '.' + extraclass + '{background-image: url("./images/'+ dish.image +'");}';
      toAppend = toAppend + '</style>';
      totalPrice += model.getTotalDishPrice(dish.id)*model.guestNum;

    }
    container.find("#pris123432").html("Total:<br>" + totalPrice + " SEK");
    container.find("#insert-matkontainer-here").html(toAppend);
  }

  this.update();

};
