async function getTodayWorkouts(uuid, date) {
  const workouts = await queryFetch(GET_TODAY_WORKOUT_QUERY, {
    userId: uuid,
    today: date,
  });
  return workouts.data.getTodayWorkouts;
}

async function createNewWorkout(workout, uuid) {
  console.log(workout);
  await queryFetch(CREATE_NEW_WORKOUT_MUTATION, {
    userId: uuid,
    title: workout[0],
    description: workout[3],
    reps: workout[1],
    series: workout[2],
  });
}
