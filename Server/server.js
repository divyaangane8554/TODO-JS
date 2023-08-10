const express = require("express");
const app = express();
const PORT = 8000;
const {connect} = require("./db");
const Todo = require("./model/todo");
const path = require("path");
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public')));
connect()
.then(()=>console.log("Database connected"))
.catch((error)=>console.log("Error:",error))

app.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname,'public','index.html'));
})

app.post("/todo",async(req,res)=>{
    try{
    const {description,category,dueDate} = req.body;
    const todo = new Todo({
        description:description,
        category,
        dueDate
    });
    const response = await todo.save();
    return res.json({data:response}).status(200);
}
catch(error){
    console.log(error)
    return res.json({error}).status(500);
}
})


app.get("/todo",async(req,res)=>{
    try{
         const todos = await Todo.find();
         return res.json({data:todos}).status(200);
    }
    catch(error){
        return res.status(500).json({error})
    }
})


app.delete("/todo", async(req,res)=>{
    try{
      const {id} = req.body;
      const response = await Todo.findOneAndDelete({_id:id});
      if(!response) return res.json({"message":"Todo Not found"}).status(400); 
      return res.json({"message":"Todo Deleted"}).status(200);

    }
    catch(error){
        return res.json({error}).status(500);
    }
})


app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`)
})

