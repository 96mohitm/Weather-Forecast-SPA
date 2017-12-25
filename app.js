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

    .when('/forecast/:days',{
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
weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', '$log', 'cityService',
function($scope, $resource, $routeParams, $log, cityService) {
    $scope.name = 'Forecast';
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: 'ae234bf2fbf8fced58092ee511d18d09' });

    $scope.covertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };

    $scope.convertToDate = function(dt){

        return new Date(dt*1000);
    };

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

}]);
//console.log($scope);
//d42fef1a17e7a422d8a3c6e40e283ba9