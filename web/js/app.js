angular.module('Strands Demo', [])
  .controller('ProductsController', function($http, $scope, $location) {
    $http.get("/data/products.json").success(function(response) {
      var products = JSON.parse(products);
      $scope.product = product[1];
    });
  });