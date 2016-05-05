app.controller('headerController', ['$scope', '$location','$rootScope','$route','$cookies','$http', function($scope, $location, $rootScope,$route, $cookies, $http) {
   $scope.isActive = function (page) {
        return page == $location.path();
    };
    function watchLocation(successCallback, errorCallback) {
        successCallback = successCallback || function(){};
        errorCallback = errorCallback || function(){};

        // Try HTML5-spec geolocation.
        var geolocation = navigator.geolocation;

        if (geolocation) {
            // We have a real geolocation service.
            try {
                function handleSuccess(position) {
                    successCallback(position.coords);
                }

                geolocation.watchPosition(handleSuccess, errorCallback, {
                    enableHighAccuracy: true,
                    maximumAge: 5000 // 5 sec.
                });
            } catch (err) {
                errorCallback();
            }
        } else {
            errorCallback();
        }
    }

    function init() {
        watchLocation(function(coords) {
            document.getElementById('test').innerHTML = 'coords: ' + coords.latitude + ',' + coords.longitude;
        }, function() {
            document.getElementById('test').innerHTML = 'error';
        });
    }

    $scope.logout = function () {
        $scope.loader = true;

        var accessToken = $cookies.get('access');

        $http({
            method: 'DELETE',
            url: 'http://whistle-dev.herokuapp.com/api/user/session',
            headers: {'Content-Type': 'application/json', Authorization: accessToken}
        }).then(function successCallback(response) {
            $scope.loader = false;
            console.log(response)
            $location.path('/login')
            $cookies.remove('name')
            $cookies.remove('access')
            $cookies.remove('phone')
            $cookies.remove('id')
        }, function() {
            $scope.loader = false;
            console.log(response)
            $cookies.remove('name')
            $cookies.remove('access')
            $cookies.remove('phone')
            $cookies.remove('id')
            $location.path('/login')
        });
    }
}]);

