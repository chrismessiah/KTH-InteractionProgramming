var finalView = function (container, model) {
  this.container = container;
  this.model = model;

  container.find("#page-head").append('<div class="row header"><h2>HOMELETTE</h2><h4>From the best chefs in the world directly into your kitchen!</h4></div><style type="text/css">body {margin: 0px;}.header, .footer {background-color: #191919;}.header > h2, .header > h4, .footer > h4 {position: relative;display: inline-block;left: 20px;font-family: "Gill Sans";color: white;}.header > h2 {margin-top: 10px;}.header > h4 {left: 40px;}</style>');
  container.find("#page-foot").append('<div class="row footer"><h4>Made by Christian and Adelina</h2></div>');
  container.find("#line1").append('My Dinner: ' + model.guestNum + ' people');




  toAppend = '';

  var mealList = model.getSelectedMenu();
  var meal;
  var extraklass;

  for (var i = 0; i < mealList.length; i++) {
    meal = mealList[i];
    extraklass = 'a' + meal.id;

    toAppend = toAppend + '<div class="row matrad"><div class="col-md-6"><div class="row"><div class="geeeethdown"><div class="col-md-1"></div>';
    toAppend = toAppend + '<div class="col-md-3 bild ' + extraklass + '"></div>';
    toAppend = toAppend + '<div class="col-md-1"></div><style>.' + extraklass + ' {background-image: url("./images/' + meal.image + '");}</style>';
    toAppend = toAppend + '<div class="col-md-7 text"><p class="black geeeethdown-title">' + meal.name + '</p>';
    toAppend = toAppend + '<p class="black">' + meal.description + '</p></div></div></div></div>';
    toAppend = toAppend + '<div class="col-md-6"><div class="row"><div class="geeeethdown"><div class="col-md-1"></div><div class="col-md-10">';
    toAppend = toAppend + '<p class="geeeethdown-title black">Preparation</p>';
    toAppend = toAppend + '<p class="black">' + 'how to cook' + '</p>';
    toAppend = toAppend + '</div></div></div></div></div>';

  }





  container.find("#food-container").html(toAppend);
};
