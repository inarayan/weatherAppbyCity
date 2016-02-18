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
            .when('/forecast/:days',{
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
    .controller('ForecastController',['$scope','$route','$resource','$routeParams','weatherService',function($scope,$route,$resource,$routeParams,
                                                                                                             weatherService){
        $scope.city=weatherService.city;

        $scope.weatherResults='';

        $scope.days=$routeParams.days || 2;

        $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily",{get:{method:"JSONP"}});

        $scope.weatherAPI.get({q:$scope.city,cnt:$scope.days,mode:'json',APPID:'863cbf69d8d84954586868c0c65d53e5'},function(data){
            $scope.weatherResults=data.list;
            console.log(data.list);
        },function(error){console.log("hey"+ error)});

        $scope.coverttoFarenheit=function(temp)
        {
            return Math.round((1.8*(temp-273)));
        };


        $scope.coverttoDate=function(dt)
        {
            return new Date(dt*1000);

        }








     }])


    //creating a directive
    .directive('searchResult',function(){
        return{
            restrict:E,
            templateUrl:'search-result.html',
            replace:true,
            scope:{

            }
        };
    })

    //Service
    .service('weatherService',function()
    {
        this.city="Newyork, NY"

    });


