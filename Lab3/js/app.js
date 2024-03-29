$(function() {
	// Get file
	var splittedLink = location.href.split("/");
	var file = splittedLink[splittedLink.length-1];

	//We instantiate our model
	var model = new DinnerModel();
	//window.model = model; // for testing in console

	//And create the needed controllers and views

	if (file == "index.html") {
		var viewI = new indexView($("#root"), model);
	}
	if (file == "browse.html") {
		var viewB = new selectDishView($("#root"), model);
		var viewB2 = new guestsColumn($("#root"), model);
		var controller1 = new pmButtonsPressed(viewB2, model);
		var controller2 = new searchBar(viewB, model);
	}
	if (file == "meal.html") {
		var viewM = new mealView($("#root"), model);
		var viewM2 = new guestsColumn($("#root"), model);
		var controller1 = new pmButtonsPressed(viewM2, model);
	}
	if (file == "overview.html") {
		var viewO = new overview($("#root"), model);
	}
	if (file == "final.html") {
		var viewF = new finalView($("#root"), model);
	}
	if (file == "allt.html") {

		// hide all except index
		$("#browse").hide();
		$("#meal").hide();
		$("#overview").hide();
		$("#final").hide();

		// index
		var viewI = new indexView($(".root"), model);

		// browse
		var viewB = new selectDishView($(".root"), model);

		// meal
		var viewM = new mealView($("#meal"), model);

		// browse and meal
		var viewB2 = new guestsColumn($(".root"), model);
		var controller1 = new pmButtonsPressed(viewB2, model);
		var controller2 = new searchBar(viewB, model);

		// overview.html
		var viewO = new overview($("body"), model);

		// final.html
		var viewF = new finalView($("body"), model);

		// all pages
		var headFootView = new headFoot($("body"), model);
		var buttonsController = new buttons($("body"), model);

	}




});
