//DinnerModel Object constructor
var DinnerModel = function() {

	this.guestNum = 1;
	this.mealsSet = true;
	this.selectedMeal = 100; // id
	this.chosenMeal = {
		"starter" : 1,
		"mainDish" : 100,
		"dessert" : 200
	};

	this.observerList = [];

	// will add new observer to the array
	this.addObserver = function(observer) {
		this.observerList.push(observer);
	}

	// will call the update method on all the observers in the array
	// has to be called every time the model changes
	this.notifyObservers = function(obj) {
		var observer;
		for (var i = 0; i < this.observerList.length; i++) {
			this.observerList[i].update();

		}
	};

	this.menuIsNull = function() {
		if (this.chosenMeal['starter'] === null && this.chosenMeal['mainDish'] === null && this.chosenMeal['dessert'] === null) {
			return true;
		}
		else {
			return false;
		}
	}

	this.getSelectedMenu = function() {
		var starter = this.getDish(this.chosenMeal['starter']);
		var mainDish = this.getDish(this.chosenMeal['mainDish']);
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
		console.log(id);
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


	// the dishes variable contains an array of all the
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name,
	// quantity (a number), price (a number) and unit (string
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it Lore ipsum",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it. Lore ipsum",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];
	this.dishes = dishes;
	this.showMeals = dishes;

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
