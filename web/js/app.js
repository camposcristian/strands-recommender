angular.module('Strands Demo', [])
  .controller('ProductsController', ['$http', '$scope','$location',function($http, $scope, $location) {
    $http.get("/data/products.json").success(function(products) {
      var url = $location.absUrl();
      var id = parseInt(url.slice(url.indexOf("id")+3));
      $scope.product = products[id];
    });
  }]);