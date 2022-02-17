const formEl = document.querySelector('#todo-form')
const titleEl = document.querySelector('#title')

function listToTodoForm() {  
  formEl.addEventListener('submit', function(event) {
    event.preventDefault()

    const todo = {
      title: titleEl.value,
      completed: false,
    }

    // console.log(todo)

    // (2) TODO: Convert todo to a JSON string using JSON.stringify()

    const todoVar = JSON.stringify(todo)
    console.log('string like a bee', JSON.stringify(todo))
    console.log(typeof JSON.stringify(todo))

    // (3) TODO: Create the fetch options to do a POST request with the
    // above string as the body

    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'  
      },
      body: todoVar
    }
    
    // (4) TODO: Call the function to add the todo (make the POST request to the server)

    const url = "http://localhost:3000/todos" 

    fetch (url, options)

    .then(function(response) {
      return response.json()
    })
    
    .then(function(todo) {
      console.log(todo)
    

    // (5) TODO: In the call back function from fetch, call createTodo with the new Todo
    
    createTodo(todo)
    })
  })
}

function createTodo(todo) {
  console.log('create todo is running', todo)
  /**
   {
    "id": 2,
    "title": "Cut the grass",
    "completed": true
   }
   */

  const liEl = document.createElement('li')
  liEl.innerText = todo.title

  // (6) TODO: if the todo is completed, make it grey
  // 

  if (todo.completed === true ) {
    liEl.setAttribute('style', 'color:grey;text-decoration:line-through')
  }


  const ulEl = document.querySelector('#todo-list')
  ulEl.append(liEl)
}

function createTodos(todos) {
  console.log('create todos is firing', todos)
  for(const todo of todos) {
     createTodo(todo)
  }
}

function init() {
  listToTodoForm()
  // (1) TODO: Make a fetch request to get all the todos (http://localhost:3000/todos)
  //   Look at pokemon example, look at the github examples
  //   In our call back, pass the todos array to the createTodos
    fetch("http://localhost:3000/todos")
    .then(function(response) {
      return response.json()
    })
    .then(function(todosArray) {
      // console.log('Are you here?', json)
      createTodos(todosArray)
      // console.log(todosArray)
    })   
}

init()
