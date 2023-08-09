const {Schema,model} = require("mongoose");


const TodoSchema = new Schema({
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    dueDate:{
        type:String
    }
})


module.exports = model("Todo",TodoSchema);