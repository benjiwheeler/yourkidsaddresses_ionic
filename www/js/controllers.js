angular.module('starter.controllers', [])

.controller('BirthdayController', ['$scope', 'peopleService',
  function($scope, peopleService) {
    $scope.birthdayFmt = birthdayFmt;
    $scope.birthdayDateWithoutYear = birthdayDateWithoutYear;
    //    $scope.birthdayDateWithoutYear = birthdayDateWithoutYear;
  }
])


.controller('CalendarController', ['$scope', function($scope) {
  var peopleByUpcomingBirthday = Array();
  console.log("CalendarController: scope.people is:");
  console.log($scope.people);
  $scope.birthdayFmt = birthdayFmt;

  function updatePeople(peopleArr) {
    peopleByUpcomingBirthday = angular.copy(peopleArr); //people.slice(0);
    peopleByUpcomingBirthday.sort(sortByTimeUntilBirthday);
  }
  updatePeople($scope.people);

  $scope.nPeopleByUpcomingBirthday = function(numPeople) {
    return peopleByUpcomingBirthday.slice(0, numPeople);
    //return people;
  };
  $scope.anyToShow = function() {
    return (peopleByUpcomingBirthday.length > 0);
  };
}])


.controller('AddressesController', ['$scope', '$state',
  function($scope, $state) {

    function needsClearfixForPeriod(index, period) {
      return (index % period === 0);
    }
    $scope.needsClearfixForPeriod = needsClearfixForPeriod;

    function findSpouse(person) {
      var spouse = _.find($scope.people, function(candidate) {
        return candidate.hasOwnProperty('spouse_of') && candidate.spouse_of === person.id;
      });
      return spouse;
    }

    function spouseStr(person) {
      var str = "";
      var spouse = findSpouse(person);
      if (spouse !== undefined && spouse !== null) {
        // console.log("spouse.last = " + spouse.last + "; trused = " + $sce.trustAsHtml(spouse.last));
        str = " and " + spouse.first + " " + spouse.last;
      }
      return str;
    }
    $scope.spouseStr = spouseStr;

    $scope.goToAddress = function(person) {
      $state.go('app.address', {personId: person.id});
    }
  }
])

.controller('AddressController', ['$scope', '$state', 'urlHandler',
  function($scope, $state, urlHandler) {
    $scope.birthdayFmt = birthdayFmt;

    function googleMapsURL(person) {
      var url = "#";
      if (enoughAddressInfoForGoogle(person)) {
        var street2Str = person.address['street2'] ? person.address['street2'] : "";
        var addressStr = encodeURIComponent(person.address.street1 + " " + person.address.city + " " + person.address.state + " " + person.address.zip);
        url = "http://maps.google.com/maps?f=q&hl=en&geocode=&time=&date=&ttype=&q=" + addressStr + "&ie=UTF8&z=16&iwloc=addr&om=1";
      }
      return url;
    }
    $scope.googleMapsURL = googleMapsURL;

    function flickrURL(person) {
      var url = "http://www.flickr.com/photos/90204134@N00/tags/" + person.first.toLowerCase() + "/";
      return url;
    }
    $scope.flickrURL = flickrURL;

    $scope.age = function(person) {
      return age(person);
    };

    function findSpouse(person) {
      var spouse = _.find($scope.people, function(candidate) {
        return candidate.hasOwnProperty('spouse_of') && candidate.spouse_of === person.id;
      });
      return spouse;
    }

    function spouseStr(person) {
      var str = "";
      var spouse = findSpouse(person);
      if (spouse !== undefined && spouse !== null) {
        // console.log("spouse.last = " + spouse.last + "; trused = " + $sce.trustAsHtml(spouse.last));
        str = " and " + spouse.first + " " + spouse.last + " (b. " + $scope.birthdayFmt(spouse, "MMM D") + ")";
      }
      return str;
    }
    $scope.spouseStr = spouseStr;

    $scope.children = {};

    function findChildren(person) {
      var children = _.filter($scope.people, function(candidate) {
        return candidate.hasOwnProperty('child_of') && candidate.child_of === person.id;
      });
      $scope.children[person.id] = children;
      return children;
    }
    $scope.childrenOf = function(person) {
      if ($scope.children.hasOwnProperty(person.id)) {
        return $scope.children[person.id];
      } else {
        return findChildren(person);
      }
    };

    $scope.openExternalUrl = urlHandler.openExternalUrl;
  }
]);
