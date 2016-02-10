$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	//And create the needed controllers and views

	var view = new indexView($("#root"), model);

});
