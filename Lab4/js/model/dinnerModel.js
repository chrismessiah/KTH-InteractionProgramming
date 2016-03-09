//DinnerModel Object constructor
var DinnerModel = function() {

	this.apiKey = "66J8l00npnHHZcCNLRhxkfW1OHxbojy4"
	//this.apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN"
	//this.apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4"
	//this.apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096"
	//this.apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6"
	//this.apiKey = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL"
	//this.apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3"
	//this.apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu"

	this.serverSearchResponse = null;
	this.serverIdResponse = null;
	this.currentInput = null;
	this.currentInputType = null;

	this.guestNum = 1;
	this.mealsSet = false;
	this.selectedMeal = null; // id
	this.chosenMeal = [];

	this.observerList = [];
	this.showMeals = [];
	this.dishes = [];

	// will add new observer to the array
	this.addObserver = function(observer, key) {
		this.observerList[key] = observer;
	};

	// will call the update method on all the observers in the array
	// has to be called every time the model changes
	this.notifyAllObservers = function() {
		for (var key in this.observerList) {
			if (this.observerList.hasOwnProperty(key)) {
				this.observerList[key].update();
			}
		}
	};

	this.notifySpecificObserver = function(key) {
		this.observerList[key].update();
	};

	this.menuIsNull = function() {
		if (this.chosenMeal.length === 0) {
			return true;
		}
		else {
			return false;
		}
	};

	this.getSelectedMenu = function() {
		return this.chosenMeal;
	}

	this.getSelectedDishView = function() {
		return this.serverIdResponse;
	}

	this.setSelectedDishView = function(id, callback, callbackData) {
		this.selectedMeal = id;
		// this.notifySpecificObserver("select");
		// this.notifySpecificObserver("meal");
		this.getRecipeJson(id, callback, callbackData);

	}

	this.setNumberOfGuests = function(num) {
		this.guestNum = num;
		this.notifySpecificObserver("column");
		if (this.serverIdResponse != null) {
			this.notifySpecificObserver("meal");
		}
		if (this.chosenMeal.length != 0) {
			this.notifySpecificObserver("overview");
			this.notifySpecificObserver("final");
		}
	};

	this.getNumberOfGuests = function() {
		return this.guestNum;
	};

	this.getSelectedDish = function(type) {
		return this.getAllDishes(type);
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
		for (var i = 0; i < this.chosenMeal.length; i++) {
			totalPrice += this.getTotalDishPrice(this.chosenMeal[i]);
		}
		return totalPrice;
	};

	this.getTotalMenuPriceWithRespectToGuestAmount = function () {
		var price = this.getTotalMenuPrice() * this.guestNum;
		return price;
	}

	this.getTotalDishPrice = function(mealObject) {
		var total_price = 0;
		var ingredients = mealObject["Ingredients"];
		for (var i = 0; i < ingredients.length; i++) {total_price += 1;}
		return total_price;
	};

	this.getTotalDishPriceWithRespectToGuestAmount = function(mealObject) {
		var priceWithRespect = this.getTotalDishPrice(mealObject) * this.guestNum;
		return priceWithRespect;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function() {
		this.chosenMeal.push(this.serverIdResponse);
		this.mealsSet = true;
		this.notifySpecificObserver("column");
		this.notifySpecificObserver("overview");
		this.notifySpecificObserver("final");
	};

	//Removes dish from menu
	this.removeDishFromMenu = function(mealObj) {
		this.chosenMeal.splice(this.chosenMeal.indexOf(mealObj),1)

		this.notifySpecificObserver("column");
		if (this.chosenMeal.length != 0) {
			this.notifySpecificObserver("overview");
			this.notifySpecificObserver("final");
		}
	};

	this.removeDishFromMenuById = function(idNum) {
		for (var i = 0; i < this.chosenMeal.length; i++) {
			if (this.chosenMeal[i]["RecipeID"] == idNum) {
				this.removeDishFromMenu(this.chosenMeal[i]);
				break;
			}
		}
	}

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
	this.getDish = function (id, callback) {
		return this.getRecipeJson(id, callback);
	}

	this.getChosenDishes = function () {
		return this.chosenMeal;
	}

	this.getRecipeJson = function(recipeID, callback, callbackData) {
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + this.apiKey;
		var model = this;
		$.ajax({
	    type: "GET",
	    dataType: 'json',
	    cache: false,
	    url: url,
	    success: function (data) {
				if (data.StatusCode) {if (data.StatusCode === 400) {alert("CHANGE API KEY");}}
				else {
					model.serverIdResponse = data;
					if (callback) {callback();}
					model.notifySpecificObserver("select");
					model.notifySpecificObserver("meal");
				}
			}
	    });
	}

	this.getRecipeJsonSearch = function(titleKeyword, categoryKeyword, callbackData, callback) {
		var model = this;
		var url;
		if (categoryKeyword === "All") {var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=" + titleKeyword + "&api_key=" + this.apiKey;}
    else {var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=" + titleKeyword + "&api_key=" + this.apiKey + "&include_primarycat=" + encodeURIComponent(categoryKeyword);}
		$.ajax({
      type: "GET",
      dataType: 'json',
      cache: false,
      url: url,
      success: function (data) {
				console.log(data);
				if (data.StatusCode) {if (data.StatusCode === 400) {swal("CHANGE API KEY");}}
				else {
					model.serverSearchResponse = data["Results"];
					model.dishes = data["Results"];
					model.showMeals = data["Results"];
					model.notifySpecificObserver("select");
					if (callback) {callback();}
				}
			},
			error: function() {
				if (titleKeyword.length > 1970) {
					swal({
		        title: "Character length exceeded!",
		        text: "Please use shorter search phrases.",
						type: "error",
		      });
				} else {
					swal({
		        title: "An error occured!",
		        text: "Are you connected to the internet?",
						type: "error",
		      });
				}
				if (callback) {callback();}
			}
    });
  }

	this.removeDishFromSelection = function(id) {
		var newList = [];
		for (var i = 0; i < this.showMeals.length; i++) {
			if (this.showMeals[i]["RecipeID"] !== id) {
				newList.push(this.showMeals[i]);
			}
		}
		this.showMeals = newList;
		this.notifySpecificObserver("select");
	}

	this.resetSelection = function() {
		this.showMeals = this.dishes;
		this.notifyObservers();
	}

};
