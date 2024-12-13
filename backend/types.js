
const zod = require("zod");

/*

{ for post route
    title: string,
    description: string
}

{  for put route
    id: string
}

*/

const createTodo = zod.object({
    title: zod.string().min(2),
    description: zod.string().min(2)
})

const updateTodo = zod.object({
    id: zod.string(),
})

module.exports = {       // way to export this file
    createTodo: createTodo,
    updateTodo: updateTodo
}