$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	//And create the needed controllers and views

	// /index
	//var view = new indexView($("#root"), model);

	// /browse
	var view = new selectDishView($("#root"), model);
  var view2 = new guestsColumn($("#root"), model);

});
