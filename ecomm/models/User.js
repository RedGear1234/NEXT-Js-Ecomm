import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require: true,
        unique : true
    },
    password:{
     type:String,
     require:true
    },
    role:{
        type:String,
        require:true,
        default:"user",
        enum:["user","admin","root"]
    }

},{
    timestamps:true
})

export default mongoose.models.User || mongoose.model('User',userSchema)