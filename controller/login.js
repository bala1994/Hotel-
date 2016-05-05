app.controller('loginController',['$scope','$http','sharedServices','$location', '$cookies', function($scope,$http,sharedServices,$location, $cookies){

    $scope.phone = '';

    $scope.login = function(phone) {
        var data = {
            "username":"+91" + phone,
            "password":"+91" + phone

        }
        $http({
            method: 'POST',
            url: 'http://whistle-dev.herokuapp.com/api/user/session',
            headers: {'Content-Type': 'application/json'},
            data: data
        }).then(function successCallback(response) {
            if (response.data) {
                sharedServices.set(response.data);
                $cookies.put('access', response.data.user.accessToken);
                $cookies.put('id', response.data.user._id);
                $cookies.put('phone', response.data.user.phone);
                $cookies.put('name', response.data.user.name);
                $location.path('/dashboard');
            }
            console.log(response);
        }, function errorCallback(response) {
            if (response) {
                $scope.message = response.data;
            }
        });
    };

}]);