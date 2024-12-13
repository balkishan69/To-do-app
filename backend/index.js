
const express = require("express");
const { createTodo, updateTodo } = require("./types");   // importing (this is called object destructuring)
const { todo } = require("./db")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())  // any frontend can hit this backend, we could also restrict this to allow only some specific frontend url to hit this backend

// Now we have to do input validation(using zod) that the user is sending the right inputs -> it is done in types.js file
// body{
//     title: String,
//     description: string
// }
app.post("/todo", async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "you sent the wrong inputs",
        })
        return;
    }

    // put it in mongodb
    await todo.create({    // you should await for the thing to actually reach the database before u tell the user that to do created
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req,res){
    const todos = await todo.find({});  // since this will be a promise, (you could also put conditions here for certain data to find)
    
    res.json({
        todos
    })
})

app.put("/completed", async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }

    try {
        // Use `findByIdAndUpdate` for simplicity if updating by ID
        const updatedTodo = await todo.findByIdAndUpdate(
            { _id: req.body.id },
            { completed: true },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            res.status(404).json({
                msg: "Todo not found",
            });
            return;
        }

        res.json({
            msg: "Todo marked as completed",
            todo: updatedTodo,
        });
    } catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).json({
            msg: "An error occurred while updating the todo",
        });
    }
})


app.listen(3000);