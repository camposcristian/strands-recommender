app = angular.module('Strands Demo', ['ngCart']);
app.controller('ProductsController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $http.get("/data/products.json").success(function(products) {
    var url = $location.absUrl();
    var id = parseInt(url.slice(url.indexOf("id") + 3));
    $scope.product = products[id - 1];


    try {
      //Event Definitions
      //Make sure first that the array is defined
      if (typeof StrandsTrack == "undefined") {
        StrandsTrack = [];
      }
      //Item was visisted
      StrandsTrack.push({
        event: "visited",
        item: id
      });

      //Launch processing
      SBS.Worker.go("0eJkBiACnt");
    } catch (e) {}
  });
}]);
app.controller('CheckoutController', ['$http', '$scope', 'ngCart', function($http, $scope, ngCart) {

  SBS.Event.subscribe("event.presubmit", function(evt) {
    try {
        if (evt.event == 'purchase') {
          evt.item = evt.item.slice(0,evt.item.indexOf("-"));
        }
    } catch (eve) {
      SBS.alert('p1', eve);
    }
    return true;
  });

  cart = ngCart.toObject();
  $scope.checkout = function() {
    try {
      //Event Definitions
      //Make sure first that the array is defined
      if (typeof StrandsTrack == "undefined") {
        StrandsTrack = [];
      }
      angular.forEach(cart.items, function(value, key) {
        StrandsTrack.push({
          event: "purchase",
          item: value.id
        });
      });

      //Launch processing
      SBS.Worker.go("0eJkBiACnt");
    } catch (e) {}
  };
}]);