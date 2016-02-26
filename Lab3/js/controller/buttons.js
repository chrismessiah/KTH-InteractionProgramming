var buttons = function(view, model) {
  var indexKnapp = view.find(".indexKnapp");
  var foodOption = view.find(".one-meal");

  indexKnapp.click(function() {
    view.find(".bg").css({"background-size" : "0 0"});

    view.find("#index").hide();
    view.find("#browse").show();

    // view.find("#index").hide();
    // view.find("#meal").show();
  })

  foodOption.click(function() {
    view.find("#browse").hide();
    view.find("#meal").show();
  })



};
