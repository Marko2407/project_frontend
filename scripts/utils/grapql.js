function queryFetch(query, variables) {
  return fetch(DEV_URL, {
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
mutation CreateWorkout($title: String, $description: String, $dateCreated: String, $reps: Int, $series: Int, $userId: ID) {
  createWorkout(title: $title,description: $description,dateCreated: $dateCreated,reps: $reps,series: $series,userId: $userId) {
    id
    title
    description
    dateCreated
    day
    series
    reps
    userId
  }
}
`;

const DELETE_USER_MUTATION = ` mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId)
  }
`;

const UPDATE_USER_MUTATION = ` mutation UpdateUser($updateUserId: String, $firstName: String, $lastName: String, $weight: Int, $height: Int) {
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
  query GetUser($userId: ID) {
  getUser(userId: $userId) {
    id
    firstName
    lastName
    weight
    height
  }
}
`;

const GET_TODAY_WORKOUT_QUERY = `
query GetTodayWorkouts($userId: ID, $today: String) {
  getTodayWorkouts(userId: $userId, today: $today) {
    id
    day
    title
    description
    reps
    series
  }
}
`;

const GET_WEEKLY_ACTIVITIES_QUERY = `
query GetWeeklyActivities($userId: String) {
  getWeeklyActivities(userId: $userId) {
    activities {
      id
      day
      dateCreated
      steps
      totalSteps
      userId
    }
    totalSteps
  }
}
`;
//IZMJENI
const GET_TODAY_ACIVITY_QUERY = `
query GetTodayActivity($userId: String) {
  getTodayActivity(userId: $userId) {
    id
    day
    dateCreated
    steps
    totalSteps
    userId
  }
}
`;

const UPDATE_TODAY_STEPS_MUTATION = `
 mutation UpdateTodayActivity($steps: Int, $userId: String) {
  updateTodayActivity(steps: $steps, userId: $userId) {
    id
    day
    dateCreated
    steps
    totalSteps
    userId
  }
}
`;

const CREATE_NEW_TODAY_ACTIVITY = `
mutation CreateNewTodayActivity($steps: Int, $userId: String) {
  createNewTodayActivity(steps: $steps, userId: $userId) {
    id
    day
    dateCreated
    steps
    totalSteps
    userId
  }
}`;

const GET_MONTHLY_ACTIVITIES_QUERY = `
query GetMonthlyActivities($date: String, $userId: String) {
  getMonthlyActivities(date: $date, userId: $userId) {
    week
    weeklyActivities {
      id
      day
      dateCreated
      steps
      totalSteps
    }
    totalSteps
    userId
  }
}
`;

const GET_WORKOUT_BY_SEARCH_QUERY = `
query GetWorkoutBySearchInput($searchInput: String, $userId: ID) {
  getWorkoutBySearchInput(searchInput: $searchInput, userId: $userId) {
    day
    date
    workouts {
      id
      userId
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

const GET_WORKOUT_FOR_SELECTED_WEEK_QUERY = `query GetWorkoutForSelectedWeek($date: String, $userId: ID) {
  getWorkoutForSelectedWeek(date: $date, userId: $userId) {
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

const GET_LOGIN_USER = `query LoginUser($username: String, $password: String) {
  loginUser(username: $username, password: $password) {
    id
    firstName
    lastName
    weight
    height
    username
    password
  }
}
`;


