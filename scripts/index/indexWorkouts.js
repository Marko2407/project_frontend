async function getTodayWorkouts() {
  const workouts = await queryFetch(GET_TODAY_WORKOUT_QUERY);
  return workouts.data.getTodayWorkouts;
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
