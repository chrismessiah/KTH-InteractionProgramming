var guestsColumn = function (container, model) {
  this.container = container;
  this.model = model;




  // ********* Move to controller later!! ***********
	var updateMeals = function () {
		this.meals = container.find("#meals");
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
				toAppend = toAppend + '<p class="dishes">'+dishes[i].name+'</p>';
				toAppend = toAppend + '</div><div class="col-md-6">';
				toAppend = toAppend + '<p class="prices">'+dish_cost+'</p>';
				toAppend = toAppend + '</div></div>';
			}
		}
		toAppend = toAppend + '<div class="row"><div class="col-md-6"><p class="dishes">Total Cost</p></div><div class="col-md-6"><p class="prices total-cost">'+total_cost+'</p></div></div>';
		toAppend = toAppend + '<div class="center"><input type="submit" value="Confirm"/></div>';


		this.meals.html(toAppend);
	};

	var updateGuests = function () {
		var num = model.getNumberOfGuests();
		container.find("#guestCount").html(num);
    if (model.mealsSet) {
      updateMeals();
    }
	};

	updateGuests();

	container.find("#plusGuest").click(function(){
		var num = model.getNumberOfGuests();
		model.setNumberOfGuests(num + 1);
		updateGuests();
	});

	container.find("#minusGuest").click(function(){
		var num = model.getNumberOfGuests();
		if (num > 1) {
			model.setNumberOfGuests(num - 1);
			updateGuests();
		}
	});

	//  ******** Move to controller later!! *******
};
