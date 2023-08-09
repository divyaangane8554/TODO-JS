const mongoose = require("mongoose");
const url = `mongodb://0.0.0.0:27017/Todo`;


exports.connect = async ()=>{
        return await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }); 
}