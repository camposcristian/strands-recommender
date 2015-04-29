app = angular.module('Strands Demo', ['ngCart']);
app.controller('ProductsController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $http.get("/data/products.json").success(function(products) {
    var url = $location.absUrl();
    var id = parseInt(url.slice(url.indexOf("id") + 3));
    $scope.product = products[id - 1];

    var rendering_function = function (rec_info){
        console.log(rec_info);
        console.log(rec_info.recommendations);
        var $divStrands = $('.strandsRecs');
        $divStrands.append('<h4>Best Sellers</h4>')
        //$divStrands.text('asdasda') ;
        //$divStrands.html('<ul class="giuseppe"></ul>');
        $divStrands.append('<ul class="giuseppe">');
        var $ul = $(".giuseppe");

        
        var callbacks = $.Callbacks();
        var count=0;
        rec_info.recommendations.forEach(function(itemObject) {
            console.log(itemObject);
            
            $ul.append('<li onclick="SBS.Tracking.onRecClick('+itemObject.itemId+','+'\''+rec_info.tpl+'\''+','+rec_info.rrq+');return true;"><a href="details.html?id='+itemObject.itemId+'" style="padding: 0imgpx; overflow: hidden;"><img alt="myItem" title="myItem" style="padding-left: 42px;margin: 0px auto; float: left; display:block;width: 40%;  height: 40%;"  src="'+itemObject.metadata.picture+'"><h3 style="float: left;text-shadow: 0 1px 0 #ffffff;    font-family: '+'\''+'bebas_neueregular'+'\''+';    color: #555555;    font-size: 20px;    margin-bottom: 10px; padding-left: 20px;padding-top: 40px;">'+itemObject.metadata.name+'</h3> </a></li>');
            

            }
        
        );
        
        
        

        
        
        /*
        for (index = 0; index < a.length; ++index) {
            
        }*/
      };

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
      //SBS.Recs.setRenderer(rendering_function);
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