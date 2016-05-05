app.controller('otpController',['$scope','$http','sharedServices','$location',function($scope,$http,sharedServices,$location){

    $scope.otp = function (user) {
        var data = {
                "verify": user.verify
            }
        $http({
            method: 'POST',
            url: 'http://whistle-dev.herokuapp.com/api/user/verifySignup',
            headers: {'Content-Type': 'application/json'},
            data: data
        }).then(function successCallback(response) {
            if (response.data) {
                sharedServices.set(response.data);
                $cookies.put('access', response.data.user.accessToken);
                $cookies.put('id', response.data.user._id);
                $cookies.put('phone', response.data.user.phone);
                $cookies.put('name', response.data.user.name);
                $location.path('/login');
            }
            console.log(response);
        }, function errorCallback(response) {
            if (response) {
                $scope.message = response.data;
            }
        });
    };
}]);