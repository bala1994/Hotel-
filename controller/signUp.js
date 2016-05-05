app.controller('signUpController',['$scope','$http','sharedServices','$location',function($scope,$http,sharedServices,$location){
    /* model show up */
    $(document).ready(function() {
        $("#myModal").modal('show');
    });

    $scope.register = function (user) {
        var data = {
            "user" : {
                "name": user.name,
                "phone": "+91"+ user.phone,
                "category":"food",
                "provider":true,
                "location":[mysrclat,mysrclong],
                "comment":"good food",
                "photo"  : "https://static01.nyt.com/images/2012/10/31/dining/31STUFF_APPLES/31STUFF_APPLES-articleLarge-v2.jpg",
                "reachability":{
                    "call": true,
                    "msg":false,
                    "email":false
                },
                "whistleImages":[
                    "https://static01.nyt.com/images/2012/10/31/dining/31STUFF_APPLES/31STUFF_APPLES-articleLarge-v2.jpg",
                    "http://www.fotoartglamour.com/pictures/small-pink-flower.JPG",
                    "http://www.fotoartglamour.com/pictures/small-pink-flower.JPG"
                ]

            }

        }

     $http({
         method: 'POST',
         url: 'http://whistle-dev.herokuapp.com/api/user',
         headers: {'Content-Type': 'application/json'},
         data: data
     }).then(function successCallback(response) {
         if (response.data) {
             sharedServices.set(response.data);
             $location.path('/otp');
         }
         console.log(response);
     }, function errorCallback(response) {
         if (response) {
             $scope.message = response.data;
         }
     });
 };

 /* find location */
    var mysrclat= 0; var mysrclong = 0;

    $scope.nearme = function($scope) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                mysrclat = position.coords.latitude;
                mysrclong = position.coords.longitude;
                console.log(mysrclat);
                console.log(mysrclong);
                $("#myModal").modal('hide');
            });

        }
    }
}]);
