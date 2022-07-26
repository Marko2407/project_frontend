//Manipulacija s datumima
function subtractWeeks(numOfWeeks, date = new Date()) {
  return date.setDate(date.getDate() - numOfWeeks * 7);
}

function multiplyWeeks(numOfWeeks, date) {
  return date.setDate(date.getDate() + numOfWeeks * 7);
}

function createDateString(dateCreated) {
  return (
    dateCreated.getDate() +
    "." +
    dateCreated.getMonth() +
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
