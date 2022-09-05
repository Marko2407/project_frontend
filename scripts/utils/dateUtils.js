//Manipulacija s datumima
function subtractWeeks(numOfWeeks, date = new Date()) {
  return date.setDate(date.getDate() + numOfWeeks * 7);
}

function subtractMonths(numOfWeeks, date = new Date()) {
  return date.setMonth(date.getMonth() + 1 * numOfWeeks);
}

function multiplyWeeks(numOfWeeks, date) {
  return date.setDate(date.getDate() + numOfWeeks * 7);
}

function createDateString(dateCreated) {
  console.log(dateCreated);
  return (
    dateCreated.getDate() +
    '.' +
    (dateCreated.getMonth() + 1) +
    '.' +
    dateCreated.getFullYear() +
    '.'
  );
}

const removeTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

function getDayOnCroatian(day) {
  console.log(day);
  if (day == 'Sunday') {
    return 'Nedjelja';
  } else if (day == 'Monday') {
    return 'Ponedjeljak';
  } else if (day == 'Tuesday') {
    return 'Utorak';
  } else if (day == 'Wednesday') {
    return 'Srijeda';
  } else if (day == 'Thursday') {
    return 'Četvrtak';
  } else if (day == 'Friday') {
    return 'Petak';
  } else if (day == 'Saturday') {
    return 'Subota';
  }
}

const daysInWeek = [
  'Nedjelja',
  'Ponedjeljak',
  'Utorak',
  'Srijeda',
  'Četvrtak',
  'Petak',
  'Subota',
];
