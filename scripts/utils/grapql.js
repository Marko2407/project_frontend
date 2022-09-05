function queryFetch(query, variables) {
  return fetch(PROD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}

//QUERIES AND MUTATIONS
const CREATE_NEW_WORKOUT_MUTATION = `
mutation CreateWorkout($title: String, $description: String, $dateCreated: String, $reps: Int, $series: Int) {
  createWorkout(title: $title,description: $description,dateCreated: $dateCreated,reps: $reps,series: $series) {
      id
      title
      description
      dateCreated
      day
      series
      reps
    }
  }
`;

const DELETE_USER_MUTATION = ` mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId)
  }
`;

const UPDATE_USER_MUTATION = ` mutation UpdateUser($updateUserId: ID, $firstName: String, $lastName: String, $weight: Int, $height: Int) {
  updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, weight: $weight, height: $height) {
      id
      firstName
      lastName
      weight
      height
    }
  }
`;

const CREATE_NEW_USER_MUTATION = ` mutation CreateUser($firstName: String, $lastName: String, $weight: Int, $height: Int) {
  createUser(firstName: $firstName, lastName: $lastName, weight: $weight, height: $height) {
      firstName
      lastName
      weight
      height
    }
  }
`;

const GET_CURRENT_USER_QUERY = `
  query GetUser {
    getUser {
      id
      firstName
      lastName
      weight
      height
    }
  }
`;

const GET_TODAY_WORKOUT_QUERY = `
  query {
      getTodayWorkouts {
        id
        day
        title
        description
        dateCreated
        series
        reps
        }
  }
`;

const GET_WEEKLY_ACTIVITIES_QUERY = `
query GetWeeklyActivities {
  getWeeklyActivities {
    activities {
      id
      day
      dateCreated
      steps
      totalSteps
    }
    totalSteps
  }
}
`;

const GET_TODAY_ACIVITY_QUERY = `
 query GetTodayActivity {
   getTodayActivity {
     id
     day
     dateCreated
     steps
     totalSteps
   }
 }
`;

const UPDATE_TODAY_STEPS_MUTATION = `
 mutation Mutation($steps: Int) {
   updateTodayActivity(steps: $steps) {
     id
     day
     dateCreated
     steps
     totalSteps
   }
 }
`;

const CREATE_NEW_TODAY_ACTIVITY = `
mutation CreateNewTodayActivity($steps: Int) {
  createNewTodayActivity(steps: $steps) {
    id
    day
    dateCreated
    steps
    totalSteps
  }
}`;

const GET_MONTHLY_ACTIVITIES_QUERY = `
query GetMonthlyActivities($date: String) {
  getMonthlyActivities(date: $date) {
    week
    weeklyActivities {
      id
      day
      dateCreated
      steps
      totalSteps
    }
    totalSteps
  }
}
`;

const GET_WORKOUT_BY_SEARCH_QUERY = `
query GetWorkoutBySearchInput($searchInput: String) {
    getWorkoutBySearchInput(searchInput: $searchInput) {
      day
      date
      workouts {
        id
        day
        title
        description                
        dateCreated
        series
        reps
      }
    }
  }
`;

const GET_WORKOUT_FOR_SELECTED_WEEK_QUERY = `query GetWorkoutForSelectedWeek($weeklyOffset: String) {
  getWorkoutForSelectedWeek(date: $weeklyOffset) {
    day
    workouts {
      id
      day
      title
      description
      dateCreated
      series
      reps
    }
  }
}
`;
