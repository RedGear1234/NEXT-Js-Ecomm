import Prodcut from "../../../models/Product"
import initDB from "../../../helpers/initDB";
initDB()

export default async(req, res)=>{
   switch (req.method) {
    case "GET":
        await getProdcut(req, res)
        break;
    case "DELETE":
       await deleteProdcut(req, res)
       break;
   }
    
}


const getProdcut = async (req, res) =>{
   const {pid} = req.query
   const product = await Prodcut.findOne({_id:pid})
   res.status(200).json(product)
}


const deleteProdcut = async (req, res)=>{
   const {pid} = req.query
   await Prodcut.findByIdAndDelete({_id:pid})
   res.status(200).json({})
} 