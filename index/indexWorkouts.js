async function getTodayWorkouts() {
  const workouts = await queryFetch(GET_TODAY_WORKOUT_QUERY);
  const reponse = workouts.data.getTodayWorkouts;
  document.getElementById("trenutni-dan").innerHTML =
    daysInWeek[new Date().getDay()];
  if (reponse.length !== 0) {
    console.log(reponse);
    document.getElementById("container-vjezbe").innerHTML =
      createWorkoutRowView(reponse);
  } else {
    document.getElementById("container-vjezbe").innerHTML =
      createRowWithEmptyDataView();
    // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
    console.log(EMPTY_DATA);
  }
}

async function createNewWorkout(workout) {
  console.log(workout);
  await queryFetch(CREATE_NEW_WORKOUT_MUTATION, {
    title: workout[0],
    description: workout[3],
    reps: workout[1],
    series: workout[2],
  });
}
