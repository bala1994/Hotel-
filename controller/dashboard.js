app.controller('dashboardController', ['$scope','$location', 'sharedServices','$http','$cookies', '$route', function ($scope, $location, sharedServices, $http, $cookies, $route) {

    $scope.userData = sharedServices.get();
    if(typeof $cookies.get('access') == 'undefined' || $cookies.get('access') == null){
        $location.path('/login');
    }

    $scope.msgbox = false;
    function retrieveApiCall()
    {
        $scope.loader = true;

        var id= $cookies.get('id');
        var accessToken = $cookies.get('access');
        $http({
            method: 'GET',
            url: 'http://whistle-dev.herokuapp.com/api/user/'+id,
            headers: {'Content-Type': 'application/json', 'Authorization' : accessToken}
        }).then(function successCallback(response) {
            $scope.loader = false;

            console.log(response);
            $scope.items = response.data.user.Whistles;
            if($scope.items != null || typeof $scope.items != 'undefined' || $scope.items.length == 0){
                $scope.msgbox = false;
             } else {
                $scope.message = "No Whistles created.."
                $scope.msgbox = true;
            }

        }, function () {
            $scope.loader = false;
            $scope.message = "No Whistles created.."
            $scope.msgbox = true;
            console.log(response);
        });
    }
    retrieveApiCall();

    $scope.items = [];

    $scope.mysub = function (sub) {
        $scope.comments = '';
        $scope.sub = sub;
        if(sub == 'eatshare'){
            $scope.image = "images/eat&share.jpeg"
            $scope.subcat = "Eat & Share"
        } else if(sub == 'veg'){
            $scope.image = "images/veg.jpg"
            $scope.subcat = "Vegeterian"
         } else {
            $scope.image = "images/non-veg.jpg"
            $scope.subcat = "Non - Vegeterian"
        }

    }
    $scope.createWhistle = function (comment, image) {

        $scope.loader = true;

        var accessToken = $cookies.get('access');

        var data = {
                "radius":10,
                 "limit":10,
                "whistle":
                {
                "category": "food",
                "subCategory": $scope.sub || 'veg',
                "provider": true,
                "comment": comment || 'No Description available',
                    "image":$scope.image
            }
            }

        $http({
            method: 'POST',
            url: 'http://whistle-dev.herokuapp.com/api/whistle',
            headers: {'Content-Type': 'application/json', Authorization: accessToken },
            data: data
        }).then(function successCallback(response) {
            $scope.loader = false;
            if (response.data) {
                window.location.reload();
                $scope.createWhistle = function(item) {
                    $scope.items.push(item);
                    $scope.newItem="";

                };
            }
            console.log(response);
        }, function errorCallback(response) {
            $scope.loader = false;
            if (response) {
                $scope.message = response.data;
            }
        });
    };

    $scope.deleteWhistle = function (item) {

        $scope.loader = true;

        var id= $cookies.get('id');
        var accessToken = $cookies.get('access');
        $http({
            method: 'DELETE',
            url: 'http://whistle-dev.herokuapp.com/api/whistle/'+item._id,
            headers: {'Content-Type': 'application/json', Authorization: accessToken}
        }).then(function successCallback(response) {
            $scope.loader = false;
            console.log(response);
            $route.reload();
        }, function(){$scope.loader = false;

            console.log(response);
            $route.reload();
        });
    };

    $scope.makeInActive = function (item) {

        $scope.loader = true;

        var accessToken = $cookies.get('access');
        item.active = !item.active
        if(item.active){
            var data = {
                'active': true
            }
        } else {
            var data = {
                'active': false
            }
        }
        $http({
            method: 'PUT',
            url: 'http://whistle-dev.herokuapp.com/api/whistle/' +item._id,
            headers: {'Content-Type': 'application/json', Authorization: accessToken},
            data: data
        }).then(function successCallback(response) {
            $scope.loader = false;
            console.log(response)
           $route.reload();
        }, function() {
            $scope.loader = false;
            console.log(response)
            $route.reload();
        });
    }
}]);