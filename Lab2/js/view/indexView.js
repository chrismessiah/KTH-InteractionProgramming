var indexView = function (container, model) {
	this.container = container;
	this.model = model;

	container.find("#page-head").append('<div class="row header"><h2>HOMELETTE</h2><h4>From the best chefs in the world directly into your kitchen!</h4></div><style type="text/css">body {margin: 0px;}.header, .footer {background-color: #191919;}.header > h2, .header > h4, .footer > h4 {position: relative;display: inline-block;left: 20px;font-family: "Gill Sans";color: white;}.header > h2 {margin-top: 10px;}.header > h4 {left: 40px;}</style>');
	container.find("#page-foot").append('<div class="row footer"><h4>Made by Christian and Adelina</h2></div>');


	// ********* Move to controller later!! ***********
	var updateGuests = function () {
		var num = model.getNumberOfGuests();
		container.find("#numberOfGuests").html(num);
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
