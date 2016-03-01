var guestsColumn = function (container, model) {
	model.addObserver(this);
  this.container = container;
  this.model = model;

	// ****** variables for the controller ********
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	// ****** variables for the controller ********

	// ****** iniit html ********
	var dishes = model.getChosenDishes();
	var toAppend = "";
	var total_cost = 0;
	var dish_cost = 0;
	toAppend = toAppend + '<div class="row top-meal"><div class="col-xs-6"><p class="dishes">Dish Name</p></div><div class="col-xs-6"><p class="prices">Cost</p></div></div>';

	for (var i in dishes) {
		if (dishes[i] !== null) {
			dish_cost = model.guestNum * model.getTotalDishPrice(dishes[i].id);
			total_cost = total_cost + dish_cost;
			toAppend = toAppend + '<div class="row"><div class="col-xs-6">';
			toAppend = toAppend + '<p class="dishes actual-dish-names' + i + '">' + dishes[i].name + '</p>';
			toAppend = toAppend + '</div><div class="col-xs-6">';
			toAppend = toAppend + '<p class="prices actual-dish-cost' + i + '">' + dish_cost + '</p>';
			toAppend = toAppend + '</div></div>';
		}
	}
	toAppend = toAppend + '<div class="row"><div class="col-xs-6"><p class="dishes">Total Cost</p></div><div class="col-xs-6"><p class="prices total-cost actual-dish-totalCost">'+total_cost+'</p></div></div>';
	container.find("#meals2").html(toAppend);
	container.find("#guestCount").html(model.getNumberOfGuests());
	// ****** iniit html ********


	this.update = function(data) {
		container.find("#guestCount").html(model.getNumberOfGuests());
		var currentMeals = model.getSelectedMenu();
		for (var i = 0; i < 3; i++) {
			container.find(".actual-dish-names" + i).html(currentMeals[i].name);
			container.find(".actual-dish-cost" + i).html(model.getTotalDishPriceWithRespectToGuestAmount(currentMeals[i].id));
		}
		container.find(".actual-dish-totalCost").html(model.getTotalMenuPriceWithRespectToGuestAmount());
	}

};
