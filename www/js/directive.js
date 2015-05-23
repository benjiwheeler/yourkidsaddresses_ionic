app.directive('upcomingBirthdays', function(){
  return {
    scope: { people: '=' },
    controller: 'CalendarController',
    templateUrl: 'templates/directiveUpcomingBirthdays.html'
  };
})

.directive('address', function(){
  return {
    scope: { person: '=', people: '=' },
    controller: 'AddressController',
    templateUrl: 'templates/directiveAddress.html'
  };
})

.directive('addresses', function(){
  return {
    scope: { people: '=' },
    controller: 'AddressesController',
    templateUrl: 'templates/directiveAddresses.html'
  };
})


.directive('addressesConcise', function(){
  return {
    scope: { people: '=' },
    controller: 'AddressesController',
    templateUrl: 'templates/directiveAddressesConcise.html'
  };
})

.directive('birthdayCalendar', function(){
  return {
    scope: { people: '=' },
    controller: 'BirthdayController',
    templateUrl: 'templates/directiveBirthdayCalendar.html'
  };
})

