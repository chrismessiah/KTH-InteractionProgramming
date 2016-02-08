//ExampleView Object constructor
var ExampleView = function (container, model) {
	this.container = container;
	this.model = model;
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	
	// this.numberOfGuests.html(model.getNumberOfGuests()); // use updateGuests(); instead after function-declaration

	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");


	console.log(model.chosenMeal);








	// ********* Move to controller later!! ***********
	var updateGuests = function () {
		var num = model.getNumberOfGuests();
		container.find("#numberOfGuests").html(num);
	}

	updateGuests();

	this.plusButton.click(function(){
		var num = model.getNumberOfGuests();
		model.setNumberOfGuests(num + 1);
		updateGuests();
	});

	this.minusButton.click(function(){
		var num = model.getNumberOfGuests();
		if (num > 1) {
			model.setNumberOfGuests(num - 1);
			updateGuests();
		};
	});

	//  ******** Move to controller later!! *******

	
}
 
