const workoutList = document.getElementById('workout-list')
let list = []
const form = document.getElementById('search')
const searchInput = form.elements['search'];

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

let getAllWorkouts = new Promise(function(myResolve, myReject){
    const workouts = queryFetch(`
    query {
        getAllWorkouts {
            id
            day
            title
            description
            dateCreated
          }
    }
    `)
    checkResult(workouts, myResolve, myReject)

})
 
function checkResult (result, myResolve, myReject){
   if(result != null){
        return  myResolve(result)
    }else{
        return  myReject("Error")
    }
}


getAllWorkouts.then(
    function(value){
       list = value.data
       list.getAllWorkouts.forEach(e => {
        console.log(e);
        let element = document.createElement('div')
        element.innerText = e.title
         workoutList.append(element) 
    });
    
    },
    function(error){console.log(error);}
)


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