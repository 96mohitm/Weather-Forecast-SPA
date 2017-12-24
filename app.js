//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider){
   
    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast',{
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});

//SERVICES
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService',
function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
    
}]);
//FORECAST CONTROLLER
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService',
function($scope, $resource, cityService) {
//    
//    $scope.city = cityService.city;
//    
//    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
//    
////    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2, appid: 'd42fef1a17e7a422d8a3c6e40e283ba9' });
//    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 6, appid: 'd42fef1a17e7a422d8a3c6e40e283ba9' });
//    console.log($scope.weatherResult);
    $scope.name = 'Forecast';
    $scope.city = cityService.city;
    $scope.days = 6;
    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: '273783dc29c87c3659c1ee5076017988' });
    console.log($scope.weatherResult);
}]);

//d42fef1a17e7a422d8a3c6e40e283ba9