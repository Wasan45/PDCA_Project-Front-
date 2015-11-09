var mainApp = angular.module('mainApp', ['ngRoute']);
var baseView = 'webapp/view/';

mainApp.config(['$routeProvider',
  function($routeProvider) {
//    $locationProvider.html5Mode({
//    enabled: true,
//    requireBase: false
//    });
    $routeProvider
    .when('/login', {
        templateUrl: baseView + 'login.html',
        controller: 'LoginController'
    })
    .when('/register', {
        templateUrl: baseView + 'register.html',
        controller: 'RegisterController'
    })
    .when('/form', {
        templateUrl: baseView + 'form.html',
        controller: 'FormController'
    })
    .otherwise({
        redirectTo: '/index'
    });
  }]);