var birthdayDateForYear = function(person, year) {
  return new Date(year, person.birthday.monthnum - 1, person.birthday.daynum);
};
var birthdayDateWithoutYear = function(person) {
  var birthDate = birthdayDateForYear(person, 2015);
//  console.log(person.first + birthDate + person.birthday.daynum);
  return birthDate;
};
var dateBorn = function(person) {
  return new Date(person.birthday.year, person.birthday.monthnum - 1, person.birthday.daynum);
};

var today = new Date();
today.setHours(0,0,0,0);

var nextBirthdayWithYear = function(person) {
  var curYear = today.getFullYear();
  var nextYear = curYear + 1;
  var birthdayThisYear = birthdayDateForYear(person, curYear);
  var birthdayNextYear = birthdayDateForYear(person, nextYear);
  var nextBirthday = birthdayThisYear;
  if (nextBirthday < today) {
    nextBirthday = birthdayNextYear;
  }
  return nextBirthday;
};

var sortByTimeUntilBirthday = function(personA, personB) {
  var nextBirthdayA = nextBirthdayWithYear(personA);
  var nextBirthdayB = nextBirthdayWithYear(personB);
  if (nextBirthdayA < nextBirthdayB) {
    return -1;
  } else if (nextBirthdayB < nextBirthdayA) {
    return 1;
  } else {
    return 0;
  }
};

var age = function(person) {
  return today - dateBorn(person);
};

var  birthdayFmt = function(person, fmt) {
    var birthDate = birthdayDateWithoutYear(person);
   // return "ht";
    return moment(birthDate).format(fmt);
  };

function enoughAddressInfoForGoogle(person) {
  return (person.hasOwnProperty('address') && person.address.hasOwnProperty('street1') && person.address.hasOwnProperty('city') && person.address.hasOwnProperty('state') && person.address.hasOwnProperty('zip'));
}
