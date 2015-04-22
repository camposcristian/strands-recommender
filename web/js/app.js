angular.module('Strands Demo', [])
  .controller('ProductsController', ['$http', '$scope','$location',function($http, $scope, $location) {
    $http.get("/data/products.json").success(function(products) {
      var url = $location.absUrl();
      var id = parseInt(url.slice(url.indexOf("id")+3));
      $scope.product = products[id-1];

      
      try{
  		//Event Definitions
  		//Make sure first that the array is defined
  		if (typeof StrandsTrack=="undefined"){StrandsTrack=[];}
  		//Item was visisted
  			StrandsTrack.push({
		    event:"visited",
    		item: id
  		});

  		//Launch processing
		SBS.Worker.go("0eJkBiACnt");
	  } catch (e){};
    });
  }]);