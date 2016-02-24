var buttons = function(view, model) {
  var indexKnapp = view.find(".indexKnapp");

  indexKnapp.click(function() {
    view.find(".bg").css({"background-size" : "0 0"});
    view.find("#index").hide();
    view.find("#browse").show();
  })

};
