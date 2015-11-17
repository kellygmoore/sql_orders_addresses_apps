
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
    $scope.selection = {};
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
    $scope.selection = {};
    $scope.thisOrderArray = [];
    $scope.employeeArray = [];

    $scope.getEmployees = function(){
        $http.get('/people').then(function(response){
            $scope.employeeArray = response.data;
        });
    };
    //console.log($scope.selection);

    $scope.getTheOrders = function(){

        var hope = {};
        hope = $scope.selection;
        console.log(hope.name);
        $http.post('/getposts', hope).then(function(response){
            console.log(response);
            $scope.thisOrderArray = response.data;
        })
    };

    $scope.getTotal = function(){
        console.log($scope.thisOrderArray.length);
        var sum = 0;
        for(var i = 0; i < $scope.thisOrderArray.length; i++){
            sum += parseInt($scope.thisOrderArray[i].amount);
        }
        return sum;
    };

    $scope.getEmployees();
}]);