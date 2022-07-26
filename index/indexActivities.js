async function getWeeklyActivities() {
  const a = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY);
  console.log(a.data.getWeeklyActivities);
  return a.data.getWeeklyActivities;
}

async function getTodayActivity() {
  const a = await queryFetch(GET_TODAY_ACIVITY_QUERY);
  return a.data.getTodayActivity;
}

async function updateTodaySteps(step) {
  await queryFetch(UPDATE_TODAY_STEPS_MUTATION, {
    steps: step,
  });
  xValues = [];
  yValues = [];
  await getTodayActivity();
  await getWeeklyActivities();
}

async function createNewTodayActivity(steps) {
  console.log(steps);
  await queryFetch(CREATE_NEW_TODAY_ACTIVITY, {
    steps: steps,
  });
  location.reload();
}
