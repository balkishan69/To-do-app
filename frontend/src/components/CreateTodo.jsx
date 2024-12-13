// note this file name should start with capital letter and with .jsx extension

import { useState } from "react";

export function CreateTodo(){   // start with capital C
    
    // react-query
    //you create a local state variable here(title and description)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    // now just use this to send out data below on button onClick

    return <div>
        <input id="title" style={{  // two curly braces for style because, one for generally and one for because this is an object
            padding: 10,
            margin: 10
        }} type="text" placeholder="title" onChange={function(e) {
            const value = e.target.value;
            // console.log(e.target)
            setTitle(e.target.value)
        }}></input>
        <br />
        <input id="description" style={{  // two curly braces for style because, one for generally and one for because this is an object
            padding: 10,
            margin: 10
        }} type="text" placeholder="description" onChange={function(e) {
            const value = e.target.value;
            setDescription(e.target.value)
        }}></input>
        <br />

        <button style={{  // two curly braces for style because, one for generally and one for because this is an object
            padding: 10,
            margin: 10
        }} onClick={() => {
            // this is slightly easier if we use axios library
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    // title: document.getElementById("title").innerHTML,  // but this is not the right way to do it, there is a better way to do this using "react-query"
                    // description: document.getElementById("description").innerHTML
                    
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async function(res){
                const json = await res.json();
                alert("Todo added")
            })
        }}>Add a todo</button>
    </div>
}

// we could also use module.exports syntax to export this