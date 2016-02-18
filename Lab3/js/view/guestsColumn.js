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
	toAppend = toAppend + '<div class="row top-meal"><div class="col-md-6"><p class="dishes">Dish Name</p></div><div class="col-md-6"><p class="prices">Cost</p></div></div>';

	for (var i in dishes) {
		if (dishes[i] !== null) {
			dish_cost = model.guestNum * model.getTotalDishPrice(dishes[i].id);
			total_cost = total_cost + dish_cost;
			toAppend = toAppend + '<div class="row"><div class="col-md-6">';
			toAppend = toAppend + '<p class="dishes actual-dish-names">' + dishes[i].name + '</p>';
			toAppend = toAppend + '</div><div class="col-md-6">';
			toAppend = toAppend + '<p class="prices actual-dish-cost">' + dish_cost + '</p>';
			toAppend = toAppend + '</div></div>';
		}
	}
	toAppend = toAppend + '<div class="row"><div class="col-md-6"><p class="dishes">Total Cost</p></div><div class="col-md-6"><p class="prices total-cost actual-dish-totalCost">'+total_cost+'</p></div></div>';
	toAppend = toAppend + '<div class="center"><input class="guestClassButton" type="submit" value="Confirm"/></div>';
	container.find("#meals").html(toAppend);
	container.find("#guestCount").html(model.getNumberOfGuests());
	// ****** iniit html ********


	this.update = function() {
		container.find("#guestCount").html(model.getNumberOfGuests());
		var dishContainerList1 = container.find(".actual-dish-names");
		var dishContainerList2 = container.find(".actual-dish-cost");
		var currentMeals = model.getSelectedMenu();
		for (var i = 0; i < dishContainerList1.length; i++) {
			$(dishContainerList1[i]).html(currentMeals[i].name);
			$(dishContainerList2[i]).html(model.getTotalDishPriceWithRespectToGuestAmount(currentMeals[i].id));
		}
		container.find(".actual-dish-totalCost").html(model.getTotalMenuPriceWithRespectToGuestAmount());
	}

};
