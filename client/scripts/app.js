
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
    console.log($scope.selection);

    $scope.info = {};
    $scope.employeeArray = [];
    $scope.thisAddressArray = [];

    var empName = $scope.selection;

    $scope.getEmployees = function(){
        $http.get('/people').then(function(response){
            $scope.employeeArray = response.data;
        });
    };

    $scope.getThisAddress = function(empName){
      $http.get('/thisaddress').then(function(response){
          $scope.thisAddressArray = response.data;
      })
    };

    $scope.getEmployees();

}]);