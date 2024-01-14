import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NewTodoForm } from './NewTodoForm'

//structure Hook, helper functions, JSX.

function App() {
  //usestates
  
  //get the items from local storage, if no items, return null
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  //set items in local storage, update when [todos] change
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
            //adds todos inside the array
            setTodos(currentTodos => {
              return [
                  ...currentTodos,
                  { id: crypto.randomUUID(), title, completed: false },
              ]
          })
  }



  //function to check the checkbox
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          //anytime you change a state, you create a new state like this
          return { ...todo, completed}
        }
          return todo
      })
    })
  }

  //function delete
  function deleteTodo(id) {
    setTodos(currentTodos => {
      //check if the ids match
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

 
  //class becomes className in react.
  return ( 
  <>
  {/* Import form input from NewTodoForm.jsx */}
  <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">Liste de course</h1>
    <ul className="list">
      {/* If no items are in the list, print "pas d'éléments" */}
      {todos.length === 0 && "Pas d'éléments"}
      {/* for each item in todos, render them */}
      {todos.map(todo => {
        return (
          // in react, each elements require a key property
        <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          {/* you need to pass a function in the eventlistener function */}
          <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Supprimer</button>
        </li>
        )

      })}
      
    </ul>
  </>
  )
}

export default App
