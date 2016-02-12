var selectDishView = function (container, model) {
  this.container = container;
  this.model = model;

  container.find("#page-head").append('<div class="row header"><h2>HOMELETTE</h2><h4>From the best chefs in the world directly into your kitchen!</h4></div><style type="text/css">body {margin: 0px;}.header, .footer {background-color: #191919;}.header > h2, .header > h4, .footer > h4 {position: relative;display: inline-block;left: 20px;font-family: "Gill Sans";color: white;}.header > h2 {margin-top: 10px;}.header > h4 {left: 40px;}</style>');
  container.find("#page-foot").append('<div class="row footer"><h4>Made by Christian and Adelina</h2></div>');

  var dish;
  toAppend = '';
  for (var i = 0; i < model.dishes.length; i++) {
    dish = model.dishes[i];
    extraclass = 'a' + dish.id;

    if (i === 0) {
      toAppend = toAppend + '<div class="row">';
    }


    toAppend = toAppend + '<div class="col-md-2 one-meal">';
    toAppend = toAppend + '<div class="meal-pic ' + extraclass + '"></div>';
    toAppend = toAppend + '<div class="meal-name-box"><div class="center">';
    toAppend = toAppend + '<p class="text-center black">' + dish.name + '</p>';
    toAppend = toAppend + '</div></div>';
    toAppend = toAppend + '<p class="black">'+ dish.description.substring(0,40) +'</p></div>';

    toAppend = toAppend + '<style>';
    toAppend = toAppend + '.' + extraclass + '{background-image: url("./images/'+ dish.image +'");}';
    toAppend = toAppend + '</style>';
    if (i === 5) {
      toAppend = toAppend + '</div><div class="row">';
    }
    if (i === (model.dishes.length-1)) {
      toAppend = toAppend + '</div>';
    }
  }


  container.find("#meal-container").html(toAppend);

};
