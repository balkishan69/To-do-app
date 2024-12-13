import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'


// created components in different folder 'components'

function App() {
  const [todos, setTodos] = useState([]);    // state variable

  // fetch("http://localhost:3000/todos")   // hitting the backend and updating the todos(btw this is the wrong way to do it)- this is not the right way to send the fetch request in a express application. fetch function is being called directly in the component's body. In React, any state update (like calling setTodos) triggers a re-render of the component, and the code in the component body runs again. This causes fetch to run repeatedly, creating an infinite loop of requests. To prevent this, you need to use the useEffect hook to fetch data only when the component mounts or under specific conditions.
  //   .then(async function(res){
  //     const json = await res.json();
  //     setTodos(json.todos);
  //   })

  
  // Use useEffect to fetch todos on component mount
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
       <CreateTodo></CreateTodo>
       <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
