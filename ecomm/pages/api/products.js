import initDB from "../../helpers/initDB"
import Product from "../../models/Product"
initDB()


export default async (req, res )=>{
  switch (req.method) {
    case "GET": 
       await getallProducts(req,res)
      break
      case "POST": 
       await saveProduct(req,res)
      break
  }
}

const getallProducts = async (req, res) =>{
  try {
    const products = await Product.find()
     res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
    
}


const saveProduct = async  (req, res) =>{
  try {
      const {Name, Price, mediaUrl, Description} = req.body
      console.log(Name)
      console.log(Price)
      console.log(Description)
      console.log(mediaUrl)
      if (!Name || !Price || !mediaUrl || !Description) {
      return res.status(422).json({error : "Please add all the fields"})
      }
      const product = new Product({
        Name,
        Price,
        Description,
        mediaUrl
      }).save()
      res.status(201).json(product)
  } catch (error) {
    res.status(500).json({error: "internal server error"})
    console.log(error)
  }
}

