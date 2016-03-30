// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  this.apiKey = "66J8l00npnHHZcCNLRhxkfW1OHxbojy4"
  //this.apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN"
  //this.apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4"
  //this.apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096"
  //this.apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6"
  //this.apiKey = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL"
  //this.apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3"
  //this.apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu"

  var numberOfGuest = 2
  var totalCost = 0;

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1, rpp:25, api_key:this.apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:this.apiKey});

  this.searchResult = null;
  this.idResult = null;

  this.setNumberOfGuests = function(num) {
    if (num >= 0) {
      numberOfGuest = num;
    }
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  this.getTotalCost = function() {
    return totalCost;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes)
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
