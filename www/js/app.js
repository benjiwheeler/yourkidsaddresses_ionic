// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers'])

.run(['$ionicPlatform', '$rootScope', '$timeout', '$state',
  function($ionicPlatform, $rootScope, $timeout, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

$timeout(function() {
  alert("going to main");
    $state.go('app.main');
}, 5000);

  });

}])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      resolve: {
        people: ['$stateParams', '$rootScope', 'peopleService',
        function($stateParams, $rootScope, peopleService) {
          var promise = peopleService.getPeople().then(function(peopleResult) {
            console.log("app/resolve: peopleResult is:");
            console.log(peopleResult);
            return peopleResult;
          });
          return promise;
        }]
      },
      controller: ['$scope', 'people',
      function($scope, people) {
        console.log("app:controller: people is:");
        console.log(people);
        $scope.people = people;
      }]
    })

  .state('app.main', {
    url: "/main",
    controller: ['$scope', function($scope) {}],
    views: {
      'menuContent': {
        templateUrl: "templates/main.html"
      }
    }
  })

  .state('app.addresses', {
    url: "/addresses",
    views: {
      'menuContent': {
        templateUrl: "templates/addresses.html"
      }
    }
  })

  .state('app.address', {
    url: "/address/:personId",
    resolve: {
      person: ['$stateParams', 'peopleService',
      function($stateParams, peopleService) {
        var promise = peopleService.getPeople().then(function(peopleResult) {
          return _.find(peopleResult, function(candidate) {
            var result = candidate.hasOwnProperty('id') && candidate.id === $stateParams.personId;
            console.log("candidate: " + candidate.id + " result: " + (result ? "true" : "false"));
            return result;
          });
        });
        return promise;
      }]
    },
    views: {
      'menuContent': {
        templateUrl: "templates/address.html",
        controller: ['$scope', 'person',
        function($scope, person) {
          console.log("app.address:controller: person is:");
          console.log(person);
          $scope.person = person;
        }
      }
    }
  })

  .state('app.birthdays', {
    url: "/birthdays",
    views: {
      'menuContent': {
        templateUrl: "templates/birthdays.html"
      }
    }
  })

  .state('app.other', {
    url: "/other",
    views: {
      'menuContent': {
        templateUrl: "templates/other.html",
        controller: ['$scope', 'urlHandler', function($scope, urlHandler) {
          console.log("other controller running");
          $scope.openExternalUrl = urlHandler.openExternalUrl;
        }]
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
}]);

app.filter('isAddressOwner', function() {
  return function(people) {
    return people.filter(function(person) {
      return (person.hasOwnProperty('owner') && person.owner === true);
    });
  };
});


app.service('urlHandler', function() {
  return {
    // need this to be able to open links on ios without hijacking the phonegap view!
    // see https://blog.nraboy.com/2014/07/launch-external-urls-ionicframework/
    openExternalUrl: function(url) {
      console.log("urlHandler: openExternalUrl: running");
      //$log.log("urlHandler: openExternalUrl: running");
      window.open(url, '_system', 'location=yes');
      return false;
    }
  }
});
