
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
    $scope.info = {};
    $scope.employeeArray = [];
    $scope.thisAddressArray = [];

    $scope.getEmployees = function(){
        $http.get('/people').then(function(response){
            $scope.employeeArray = response.data;
        });
    };

    $scope.getThisAddress = function(){
        var empName = ($scope.selection);
        //var sendName = empName.name.name;
        $http.post('/thisaddress', empName).then(function(response){
            console.log(response);
          $scope.thisAddressArray = response.data;
      })
    };
    $scope.getEmployees();
}]);

myApp.controller('OrderController', ['$scope', '$http', function($scope, $http){
    //$scope.orderArray = [];
    $scope.thisOrderArray = [];
    $scope.employeeArray = [];

    $scope.getEmployees = function(){
        $http.get('/people').then(function(response){
            $scope.employeeArray = response.data;
        });
    };
    //console.log($scope.selection);

    $scope.getTheOrders = function(){
        var getName = ($scope.selection);
        var endDate = ($scope.selected.dateend);
        var startDate = ($scope.selected.datestart);
        console.log(getName, endDate, startDate);
        $http.post('/getposts', getName, endDate, startDate).then(function(response){
            console.log(response);
            $scope.thisOrderArray = response.data;
        })
    };
    $scope.getEmployees();
}]);