var guestsColumn = function (container, model) {
	model.addObserver(this, "column");
  this.container = container;
  this.model = model;

	// ****** variables for the controller ********
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	// ****** variables for the controller ********

	container.find("#guestCount").html(model.getNumberOfGuests());
	// ****** iniit html ********


	this.update = function(data) {
		container.find("#guestCount").html(model.getNumberOfGuests());
		var currentMeals = model.getSelectedMenu();
		var toAppend = "";
		for (var i = 0; i < currentMeals.length; i++) {
			toAppend = toAppend + '<div class="row"><div class="col-xs-6"><p class="dishes actual-dish-names' + i + '">' + currentMeals[i]["Title"].substring(0,30) + '...</p>';
			toAppend = toAppend + '</div><div class="col-xs-6"><p class="prices actual-dish-cost' + i + '">' + model.getTotalDishPriceWithRespectToGuestAmount(currentMeals[i]) + '</p></div></div>';
		}
		if (toAppend != "") {
			toAppend = toAppend + '<div class="row"><div class="col-xs-6"><p class="dishes">Total Cost</p></div><div class="col-xs-6"><p class="prices total-cost actual-dish-totalCost">'+model.getTotalMenuPriceWithRespectToGuestAmount()+'</p></div></div>';
		}
		container.find("#actual-meals123").html(toAppend);
	}

};
