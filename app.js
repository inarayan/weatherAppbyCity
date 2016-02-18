//MODULE
angular.module('weatherApp',['ngRoute','ngResource'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
            templateUrl:'pages/home.html',
            controller:'HomeController'

            })
            .when('/forecast',{
                templateUrl:'pages/forecast.html',
                controller:'ForecastController'
            })
    })
    //HomeController
    .controller('HomeController',['$scope','$route','$resource','weatherService', function($scope,$route,$resource,weatherService){
        $scope.city=weatherService.city;
        $scope.$watch('city',function(){
            weatherService.city=$scope.city;
        });


    }])
    //ForeCastController
    .controller('ForecastController',['$scope','$route','$resource','weatherService',function($scope,$route,$resource,weatherService){
        $scope.city=weatherService.city;

        $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{get:{method:"JSONP"}});
        $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:2,mode:'json',APPID:'863cbf69d8d84954586868c0c65d53e5'});
        var obj=$scope.weatherResult;
        console.log(obj)
     }])
    //Service
    .service('weatherService',function()
    {
        this.city="Newyork, NY"

    });


