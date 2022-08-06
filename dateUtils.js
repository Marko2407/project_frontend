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
    "." +
    (dateCreated.getMonth() + 1) +
    "." +
    dateCreated.getFullYear() +
    "."
  );
}

const removeTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
