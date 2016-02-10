var guestsColumn = function (container, model) {
  this.container = container;
  this.model = model;


  // ********* Move to controller later!! ***********
	var updateGuests = function () {
		var num = model.getNumberOfGuests();
		container.find("#guestCount").html(num);
	};

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
		}
	});

	//  ******** Move to controller later!! *******
};
