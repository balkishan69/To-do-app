
// export a function called todos from this file which will have all of your todos eventually component which will render all your todos

// todos = [
//     {
//         title: "go to gym",
//         description: "go to gym"
//     }
// ]


export function Todos({todos}) {    // rendering an array of todos

    //must have single top level parent div returning
    return <div> 
        {todos.map(function(todo){   // this is just like a for loop for all todos
            
            // similarly this also returns single div
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button>{todo.completed == true ? "Completed" : "Mark as Completed"}</button>
                {/* this button should have mark as completed feature on onClick, do it yourself */}
            </div>
        })}
    </div>
    
}