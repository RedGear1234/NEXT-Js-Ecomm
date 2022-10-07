import mongoose from "mongoose"

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    mediaUrl:{
        type:String,
        require:true
    }
})

export default mongoose.models.product || mongoose.model('product', ProductsSchema)