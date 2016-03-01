//DinnerModel Object constructor
var DinnerModel = function() {

	//this.apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
	//this.apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
	this.apiKey = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";
	//this.apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu";

	this.guestNum = 1;
	this.mealsSet = true;
	this.selectedMeal = 100; // id
	this.chosenMeal = {
		"starter" : 1,
		"main dish" : 100,
		"dessert" : 200
	};

	this.observerList = [];
	this.showMeals = [];
	this.dishes = [];
	var dishes;

	// will add new observer to the array
	this.addObserver = function(observer) {
		this.observerList.push(observer);
	}

	// will call the update method on all the observers in the array
	// has to be called every time the model changes
	this.notifyObservers = function(data) {
		var observer;
		for (var i = 0; i < this.observerList.length; i++) {
			this.observerList[i].update(data);
		}
	};

	this.menuIsNull = function() {
		if (this.chosenMeal['starter'] === null && this.chosenMeal['main dish'] === null && this.chosenMeal['dessert'] === null) {
			return true;
		}
		else {
			return false;
		}
	}

	this.getSelectedMenu = function() {
		var starter = this.getDish(this.chosenMeal['starter']);
		var mainDish = this.getDish(this.chosenMeal['main dish']);
		var dessert = this.getDish(this.chosenMeal['dessert']);
		var list = [starter, mainDish, dessert];
		return list;
	}

	this.getSelectedDishView = function() {
		var meal = this.getDish(this.selectedMeal);
		return meal;
	}

	this.setSelectedDishView = function(id) {
		this.selectedMeal = id;
		this.notifyObservers();

	}

	this.setNumberOfGuests = function(num) {
		this.guestNum = num;
		this.notifyObservers();
	};

	this.getNumberOfGuests = function() {
		return this.guestNum;
	};

	this.getSelectedDish = function(type) {
		var dishes = this.getAllDishes(type);
		return dishes;
	};

	this.getFullMenu = function() {
		var starters = this.getAllDishes("starter");
		var mainDishes = this.getAllDishes("main dish");
		var desserts = this.getAllDishes("dessert");
		var jsonMenu = {
			"starters" : starters,
			"mainDishes" : mainDishes,
			"desserts" : desserts
		};
		return jsonMenu;
	};

	this.getAllIngredients = function() {
		var allIngredients = [];
		var menu = this.getFullMenu();
		for (var key in menu) {
			var courseType = menu[key];
			var courseType = [courseType[0], courseType[1], courseType[2]];
			for (var course in courseType) {
				var meal = courseType[course];
				for (var i in meal.ingredients) {
					var ingredient = meal.ingredients[i];
					allIngredients.push(ingredient.name);
				}
			}
		}
		return allIngredients;
	};

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totalPrice = 0;
		for (var key in this.chosenMeal) {
			if (this.chosenMeal.hasOwnProperty(key)) {
				totalPrice += this.getTotalDishPrice(this.chosenMeal[key]);
			}
		}
		return totalPrice;
	};

	this.getTotalMenuPriceWithRespectToGuestAmount = function () {
		var price = this.getTotalMenuPrice() * this.guestNum;
		return price;
	}

	this.getTotalDishPrice = function(id) {
		var total_price = 0;
		var dish = this.getDish(id);
		for (var i in dish.ingredients) {
		 	total_price += dish.ingredients[i].price;
		}
		return total_price;
	};

	this.getTotalDishPriceWithRespectToGuestAmount = function(id) {
		var priceWithRespect = this.getTotalDishPrice(id) * this.guestNum;
		return priceWithRespect;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dish = this.getDish(id);
		this.chosenMeal[dish.type] = id;
		this.mealsSet = true;
		this.notifyObservers();

	};

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for(var key in this.chosenMeal) {
    		if (this.chosenMeal[key].id === id) {this.chosenMeal[key] = "";};
		}
		if (this.menuIsNull()) {
			this.mealsSet = false;
		}
		this.notifyObservers();
	};

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
	  return $(dishes).filter(function(index,dish) {
		var found = true;
		if(filter){
			found = false;
			$.each(dish.ingredients,function(index,ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(var key in dishes){
			if (dishes.hasOwnProperty(key)) {
				if(dishes[key].id == id) {
					return dishes[key];
				}
			}
		}
	}

	this.getChosenDishes = function () {
		var list = [];
		for(var key in this.chosenMeal){
			if (this.chosenMeal.hasOwnProperty(key)) {
				if (this.chosenMeal[key] !== null) {
					list.push(this.getDish(this.chosenMeal[key]));
				} else {
					list.push(null);
				}

			}
		}
		return list;
	}

	this.getRecipeJson = function(recipeID) {
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + this.apiKey;
		var res = "empty1";
		$.ajax({
	    type: "GET",
	    dataType: 'json',
	    cache: false,
	    url: url,
	    success: function (data) {res = data;}
	    });
	}

	this.getRecipeJsonSearch = function(titleKeyword) {
    var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=" + titleKeyword + "&api_key=" + this.apiKey;
		var res = "empty2";
		$.ajax({
      type: "GET",
      dataType: 'json',
      cache: false,
      url: url,
      success: function (data) {console.log(data); dishes = data; this.showMeals = data; this.dishes = data; this.notifyObservers(data)}
    });
  }

	this.removeDishFromSelection = function(id) {
		var newList = [];
		for (var i = 0; i < this.showMeals.length; i++) {
			if (this.showMeals[i].id !== id) {
				newList.push(this.showMeals[i]);
			}
		}
		this.showMeals = newList;
		this.notifyObservers();
	}

	this.resetSelection = function() {
		this.showMeals = this.dishes;
		this.notifyObservers();
	}

};
