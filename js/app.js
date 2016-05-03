var app = angular.module('HeroApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/list', {
        controller: 'HeroListController',
        templateUrl: 'templates/list.html',
    }).when('/select', {
        controller: 'HeroSelectController',
        templateUrl: 'templates/select.html',
    }).when('/events', {
        controller: 'HeroEventController',
        templateUrl: 'templates/events.html',
    });
}]);


app.controller('HeroListController', ['$scope', '$http', 'HeroService', function($scope, $http, HeroService) {
    $http({
        method : "GET",
        url : "http://gateway.marvel.com:80/v1/public/characters?apikey=aecaf7c9b04cdd88b0fa5903dbe6402e&limit=100"
    }).then(function mySucces(response) {
        var heroData = response.data;
        console.log(heroData)
    }, function myError(response) {
        console.log(response.statusText);
    });
    
    $scope.heroes = HeroService.allHeroes();
    console.log('youve reached the hero list');
    
    $scope.selectHero = function (hero) {
        HeroService.addToCart(hero);
    };
}]);

app.controller('HeroSelectController', ['$scope', 'HeroService', function($scope, HeroService) {
    console.log('Hero Selector');
}]);

app.controller('HeroEventController', ['$scope', 'HeroService', function($scope, HeroService) {
    console.log('Hero Collection');
}]);

app.factory('HeroService', function() {
    var heroes = [
        { name: null, 
         picture: null,
         events: null,
         all: null,
        },
    ];
    
    var collection = [];
    
    return {
        allHeroes: function() {
            return heroes;
        },
        selectHero: function (hero) {
            collection.push(heroes.name);
        },
        deselectHero: function (hero) {
            collection.pop(heroes.name);
        },
        deselectHeroes: function() {
            collection = [];
        },
    };
});

app.filter('cap', function () {
    return function (name) {
        return name.toUpperCase();
    };
});