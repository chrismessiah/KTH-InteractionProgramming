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
		for (var i in dishes) {
				dish_cost = model.guestNum * model.getTotalDishPrice(dishes[i].id);
				total_cost = total_cost + dish_cost;
				toAppend = toAppend + '<div class="meal"><p class="dishes">'+dishes[i].name+'</p><p class="prices">'+dish_cost+'</p></div>';
		}
		container.find(".total-cost").html(total_cost);
		this.meals.html(toAppend);
	};

	var updateGuests = function () {
		var num = model.getNumberOfGuests();
		container.find("#guestCount").html(num);
		updateMeals()
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
