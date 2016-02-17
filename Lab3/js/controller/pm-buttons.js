var pmButtonsPressed = function(view, model) {

 	view.plusButton.click(function(){
 		var num = model.getNumberOfGuests();
 		model.setNumberOfGuests(num + 1);
 	});

 	view.minusButton.click(function(){
 		var num = model.getNumberOfGuests();
 		if (num > 1) {model.setNumberOfGuests(num - 1);}
 	});


};
