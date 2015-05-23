app.factory('peopleService', function($http, $log, $q) {
  var service = {};
  service.people = [];

  service.getPeople = function() {
    if (service.people.length > 0) {
      return $q.when(service.people);
    } else {
      var deferred = $q.defer();
      $http.get('https://rawgit.com/benjiwheeler/yourkidsaddresses/gh-pages/people.json')
      .success(function(data, status, headers, config) {
        while (service.people.length > 0) {
          service.people.pop();
        }
        for (var person in data) {
          if (data.hasOwnProperty(person) && typeof data[person] !== 'function') {
            // deep copy the property doesn't work; not sure why
            // angular.copy(program_response[attr], cache[attr]);
            // so just shallow copy
            console.log("peopleService: pushing data[person]:");
            console.log(data[person]);
            service.people.push(data[person]);
          }
        }
        deferred.resolve(service.people);
      });
      return deferred.promise;
    }
  };

  return service;
});
