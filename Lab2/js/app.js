$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var select = "#exampleView";
	var view = new ExampleView($(select), model);

});