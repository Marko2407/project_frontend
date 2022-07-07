const workoutList = document.getElementById('workout-list')
let list = []
const form = document.getElementById('search')
const searchInput = form.elements['search'];

async function getAll(){
    const workouts = await queryFetch(`
    query {
        getCurrentWeekWorkouts {
            day
            workouts {
              id
              title
              day
              dateCreated
              description
            }
          }
        }
    `)
    workouts.data.getCurrentWeekWorkouts.forEach(data => {
      console.log(data)
     let element = document.createElement('div')
     element.innerText = data.day
     workoutList.append(element) 
     data.workouts.forEach(workouts => {
         let element = document.createElement('div')
         element.innerText = workouts.title
         workoutList.append(element) 
     })
 });
}

//First method to initiate when page open
getAll()


form.addEventListener('submit', async e => {
    e.preventDefault()
    const getWorkoutBySearchInput = await getWorkoutBySearch(searchInput.value)
    if (getWorkoutBySearchInput.getWorkoutBySearchInput !=null){
        workoutList.innerHTML = ""
         getWorkoutBySearchInput.getWorkoutBySearchInput.forEach(e => {
        console.log(e);
        let element = document.createElement('div')
         element.innerText = e.title
         workoutList.append(element)
})
    }
    
})

function getWorkoutBySearch(searchInput){
    return queryFetch(`
         query GetWorkoutBySearchInput($title: String) {
             getWorkoutBySearchInput(title: $title) {
               id
               title
               description
               dateCreated
               day
             }
           }
         `, {title: searchInput})
         .then( res => { return (res.data)})
     }

function queryFetch(query, variables){
  return  fetch('http://localhost:4000/graphql/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
      query: query,
      variables: variables
  }),
})
.then(res => res.json())
}
