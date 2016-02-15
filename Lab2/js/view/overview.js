var overview = function (container, model) {
  this.container = container;
  this.model = model;

  container.find("#page-head").append('<div class="row header"><h2>HOMELETTE</h2><h4>From the best chefs in the world directly into your kitchen!</h4></div><style type="text/css">body {margin: 0px;}.header, .footer {background-color: #191919;}.header > h2, .header > h4, .footer > h4 {position: relative;display: inline-block;left: 20px;font-family: "Gill Sans";color: white;}.header > h2 {margin-top: 10px;}.header > h4 {left: 40px;}</style>');
  container.find("#page-foot").append('<div class="row footer"><h4>Made by Christian and Adelina</h2></div>');

  container.find("#line1").append('My Dinner: ' + model.guestNum + ' people');

  list = model.getSelectedMenu();
  var toAppend = '';
  var meal;


  toAppend = toAppend + '<div class="col-md-3"></div>';
  var totalPrice = 0;

  for (var i = 0; i < list.length; i++) {
    dish = list[i];
    extraclass = 'a' + dish.id;


    toAppend = toAppend + '<div class="col-md-2 one-meal">';
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


  toAppend = toAppend + '<div class="col-md-1 separator3"></div>';

  toAppend = toAppend + '<div class="col-md-1"></div>';
  toAppend = toAppend + '<div class="col-md-1"><p class="black getDown">Total:<br>' + totalPrice + ' SEK</p></div>';
  container.find("#matkontainer").append(toAppend);


};
