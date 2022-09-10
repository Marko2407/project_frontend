async function getWeeklyActivities(uuid) {
  const response = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY, {
    userId: uuid,
  });
  return response.data.getWeeklyActivities;
}

async function getTodayActivity(uuid) {
  const response = await queryFetch(GET_TODAY_ACIVITY_QUERY, {
    userId: uuid,
  });
  return response.data.getTodayActivity;
}

async function updateTodaySteps(step, uuid) {
  await queryFetch(UPDATE_TODAY_STEPS_MUTATION, {
    userId: uuid,
    steps: step,
  });
}

async function createNewTodayActivity(steps, uuid) {
  console.log(steps);
  await queryFetch(CREATE_NEW_TODAY_ACTIVITY, {
    userId: uuid,
    steps: steps,
  });
  location.reload();
}
