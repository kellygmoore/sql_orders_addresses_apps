
var myApp = angular.module("myApp", ['ngRoute']);


myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "assets/views/routes/home.html"
        }).
        when('/orderLookupPage', {
            templateUrl: "assets/views/routes/orderLookupPage.html"
        }).
        otherwise({
            redirectTo: 'home'
        })
}]);


myApp.controller('AddressController', ['$scope', '$http', function($scope, $http){
    console.log("Address Controller");

    $scope.info = {};
    $scope.employeeArray = [];

    $scope.getEmployees = function(){
        $http.get('/people').then(function(response){
            $scope.employeeArray = response.data;
        });
    };


    //$scope.data = {
    //
    //};

    $scope.getEmployees();

}]);