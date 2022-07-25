const addNewWorkoutsModal = document.getElementById("add");

const vj1 = document.querySelector("input[name = 'vj1']");
const vj2 = document.querySelector("input[name = 'vj2']");
const vj3 = document.querySelector("input[name = 'vj3']");

const s1 = document.querySelector("input[name = 's1']");
const s2 = document.querySelector("input[name = 's2']");
const s3 = document.querySelector("input[name = 's3']");

const r1 = document.querySelector("input[name = 'r1']");
const r2 = document.querySelector("input[name = 'r2']");
const r3 = document.querySelector("input[name = 'r3']");

const opisVj1 = document.querySelector("textarea[name = 'opisVj1']");
const opisVj2 = document.querySelector("textarea[name = 'opisVj2']");
const opisVj3 = document.querySelector("textarea[name = 'opisVj3']");

function createWorkoutList() {
  const firstWorkout = [
    vj1.value,
    parseInt(s1.value),
    parseInt(r1.value),
    opisVj1.value,
  ];
  const secondWorkout = [
    vj2.value,
    parseInt(s2.value),
    parseInt(r2.value),
    opisVj2.value,
  ];
  const thirdWorkout = [
    vj3.value,
    parseInt(s3.value),
    parseInt(r3.value),
    opisVj3.value,
  ];
  return [firstWorkout, secondWorkout, thirdWorkout];
}
