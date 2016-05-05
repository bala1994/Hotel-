app.controller('whistlesController',['$scope','$location', 'Upload', '$timeout' ,function($scope, srvShareData,Upload, $timeout, $location,fileReader) {

    $scope.selected = true;
    $scope.WhistleOn = function () {
        //do logic for WhistleOn
        $scope.selected = !$scope.selected;
    };

    $scope.WhistleOff = function () {
        //do logic for WhistleOff
        $scope.selected = !$scope.selected;

    };


    $scope.items = [];
    $scope.createWhistle = function() {
        $scope.items.push({image: $scope.ProductImage, category: $scope.ProductCategory,comments: $scope.ProductComments});
    };

/*Remove item */

    $scope.removeItem = function(index) {
        $scope.items.splice(index, 1);
    };

/*upload image*/

    $scope.stepsModel = [];

    $scope.imageUpload = function(event){
        var files = event.target.files; //FileList object
        var i =0;
            var file = files[i];
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(file);

    };

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    };
}]);
