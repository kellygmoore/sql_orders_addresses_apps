
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

    console.log($scope.selection);
    //var empName = $scope.selection;

    //$scope.clickButton = function(kittyFooFoo){
    //    console.log(kittyFooFoo);
    //    $http.post('/people', kittyFooFoo).then(function(response){
    //        $scope.getPeople();
    //        console.log(response);
    //    });
    //};


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