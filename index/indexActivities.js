async function getWeeklyActivities() {
  const a = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY);
  console.log(a.data.getWeeklyActivities);
  const result = a.data.getWeeklyActivities;
  result.activities.forEach((element) => {
    yValues.push(element.totalSteps);
  });

  createChart("myChart", yValues);
}

async function getTodayActivity() {
  const a = await queryFetch(GET_TODAY_ACIVITY_QUERY);
  const result = a.data.getTodayActivity;
  if (result !== null) {
    grafInfo.innerHTML = createActivityRowView(result);
  } else {
    await createNewTodayActivity(0);
  }
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
