async function getWeeklyActivities() {
  const response = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY);
  console.log(response);
  return response.data.getWeeklyActivities;
}

async function getTodayActivity() {
  const response = await queryFetch(GET_TODAY_ACIVITY_QUERY);
  console.log(response);
  return response.data.getTodayActivity;
}

async function updateTodaySteps(step) {
  await queryFetch(UPDATE_TODAY_STEPS_MUTATION, {
    steps: step,
  });
}

async function createNewTodayActivity(steps) {
  console.log(steps);
  await queryFetch(CREATE_NEW_TODAY_ACTIVITY, {
    steps: steps,
  });
  location.reload();
}
