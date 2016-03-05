var finalView = function (container, model) {
  model.addObserver(this, "final");
  this.container = container;
  this.model = model;

  this.update = function(data) {
    container.find("#line2").html('My Dinner: ' + model.guestNum + ' people');
    toAppend = '';

    var mealList = model.chosenMeal;
    var meal;
    var extraklass;

    for (var i = 0; i < mealList.length; i++) {
      meal = mealList[i];
      extraklass = 'a' + meal["RecipeID"];

      toAppend = toAppend + '<div class="row matrad"><div class="col-xs-6"><div class="row"><div class="geeeethdown"><div class="col-xs-1"></div>';
      toAppend = toAppend + '<div class="col-xs-3 bild ' + extraklass + '"></div>';
      toAppend = toAppend + '<div class="col-xs-1"></div><style>.' + extraklass + ' {background-image: url("' + meal["HeroPhotoUrl"] + '");}</style>';
      toAppend = toAppend + '<div class="col-xs-7 text"><p class="black geeeethdown-title">' + meal["Title"] + '</p>';

      var mealDesc = "No description was given.";
      if (meal["Description"] != "") {
        mealDesc = meal["Description"];
      }

      var mealInstruc = "No instruction was given.";
      if (meal["Instructions"] != "") {
        mealInstruc = meal["Instructions"];
      }

      toAppend = toAppend + '<p class="black">' + mealDesc + '</p></div></div></div></div>';
      toAppend = toAppend + '<div class="col-xs-6"><div class="row"><div class="geeeethdown"><div class="col-xs-1"></div><div class="col-xs-10">';
      toAppend = toAppend + '<p class="geeeethdown-title black">Preparation</p>';
      toAppend = toAppend + '<p class="black">' + mealInstruc + '</p>';
      toAppend = toAppend + '</div></div></div></div></div>';

    }
    container.find("#food-container").html(toAppend);
  }
};
