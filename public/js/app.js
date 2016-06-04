(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
   
    for (var i = 0; i < 100; i++){
        if (i % 100 === 0){
    $http({
        method : "GET",
        url : "http://gateway.marvel.com:80/v1/public/characters?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&limit=100&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1"
    }).then(function mySucces(response) {
        var heroData = response.data.data.results;
        HeroService.addHeroes(heroData);
        $scope.heroes = HeroService.allHeroes();
//        console.log(heroData); 
    }, function myError(response) {
        console.log(response.statusText);
    });
//    console.log('youve reached the hero list');
            
    $scope.selectHero = function (hero) {
        HeroService.addToCart(hero);
    };
        }

    }
}]);

app.controller('HeroSelectController', ['$scope', '$http', 'HeroService', function($scope, $http, HeroService) {
//    console.log('Hero Selector');
    
        for (var j = 0; j < 99; j++){
        if (j % 100 === 0){
    $http({
        method : "GET",
        url : "http://gateway.marvel.com:80/v1/public/characters?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&limit=5&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1"
    }).then(function mySucces(response) {
        var heroData = response.data.data.results;
        HeroService.addHeroes(heroData);
        $scope.heroes = HeroService.allHeroes();
        console.log(heroData); 
        for(var k=0;k<100/*heroData.length*/;k++) {
            console.log(heroData[k].events.collectionURI+"?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1");
            (function(k){$http({
                method :"GET",
                url : heroData[k].events.collectionURI+"?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1"}).then(
                function(res) {
                    for (var l = 0; l <  res.data.data.results.length; l++){
                        (function(l, res){$http({
                                method : "GET",
                                url : res.data.data.results[l].characters.collectionURI+"?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1"
                            }).then(function mySucces(test) {
                            res.data.data.results[l].heroes = test.data.data.results
//                   console.log(heroData); 
                   HeroService.addEvents(k, res.data.data);
                    $scope.heroes = HeroService.allHeroes();
                    console.log(res)
    }, function myError(response) {
        console.log(response.statusText);
    });})(l, res)}
    
    })})(k)
    }
    }, function myError(response) {
        console.log(response.statusText);
    });
    
    $scope.heroes = HeroService.allHeroes();
    console.log('youve reached the hero list');
            
    $scope.selectHero = function (hero) {
        HeroService.addToCart(hero);
    };
        }
    }
    $scope.eventDes = function (obj) {
        localStorage['event'] = JSON.stringify(obj);
        location.hash = "events";
    }
    
}]);

app.controller('HeroEventController', ['$scope','$http', 'HeroService', function($scope, $http , HeroService) {
//    console.log('Hero Collection');
    
    $scope.event = JSON.parse(localStorage['event']);

    $http({
        method : "GET",
        url : $scope.event.characters.collectionURI+"?apikey=bc9b3cb24d6a0dc5cb796ee19906f858&hash=6e9b6cd1099b19df878caf48f374cbb8&ts=1"
    }).then(function mySucces(response) {
        var heroData = response.data.data.results;
        $scope.heroes = heroData
//        console.log(heroData); 
    }, function myError(response) {
        console.log(response.statusText);
    });
    
    
}]);

app.factory('HeroService', function() {
    var heroes = []; 
    var events = [];
    
    return {
        allHeroes: function() {
            return heroes;
        },
        addHeroes: function (hero) {
            heroes = heroes.concat(hero);
        },
        removeHeroes: function (hero) {
            heroes.pop(hero);
        },
        addEvents: function(l, events) {
            console.log(l);
            heroes[l].eventss = events;
        }
    };
});

app.filter('cap', function () {
    return function (name) {
        return name.toUpperCase();
    };
});
},{}]},{},[1])