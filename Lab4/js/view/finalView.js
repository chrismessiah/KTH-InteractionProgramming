var finalView = function (container, model) {
  this.container = container;
  this.model = model;
  container.find("#line2").html('My Dinner: ' + model.guestNum + ' people');

  toAppend = '';

  var mealList = model.getSelectedMenu();
  var meal;
  var extraklass;

  for (var i = 0; i < mealList.length; i++) {
    meal = mealList[i];
    extraklass = 'a' + meal.id;

    toAppend = toAppend + '<div class="row matrad"><div class="col-xs-6"><div class="row"><div class="geeeethdown"><div class="col-xs-1"></div>';
    toAppend = toAppend + '<div class="col-xs-3 bild ' + extraklass + '"></div>';
    toAppend = toAppend + '<div class="col-xs-1"></div><style>.' + extraklass + ' {background-image: url("./images/' + meal.image + '");}</style>';
    toAppend = toAppend + '<div class="col-xs-7 text"><p class="black geeeethdown-title">' + meal.name + '</p>';
    toAppend = toAppend + '<p class="black">' + meal.description + '</p></div></div></div></div>';
    toAppend = toAppend + '<div class="col-xs-6"><div class="row"><div class="geeeethdown"><div class="col-xs-1"></div><div class="col-xs-10">';
    toAppend = toAppend + '<p class="geeeethdown-title black">Preparation</p>';
    toAppend = toAppend + '<p class="black">' + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + '</p>';
    toAppend = toAppend + '</div></div></div></div></div>';

  }





  container.find("#food-container").html(toAppend);
};
