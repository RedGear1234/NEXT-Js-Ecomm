import jwt from 'jsonwebtoken'
import Cart from "../../models/Cart"
import initDB from "../../helpers/initDB"
initDB()

export default async (req,res) =>{
   switch (req.method) {
    case "GET" :
        await fetchUserCart(req, res)
        break
    case "PUT" : 
         await addProduct(req, res) 

   }
}


function Authenticated (icomponent) {
    return (req, res) =>{
        const {authorization} = req.headers
        if (!authorization) {
            return res.status(401).json({error : "You Must login "})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
            req.userId = userId
            return icomponent(req, res)
        } 
        catch(error) {
            return res.status(401).json({error : "You Must Login"})
        }
    }
}


const fetchUserCart = Authenticated (async (req, res) =>{
    const cart = await Cart.findOne({user: req.userId})
                 .populate('products.prodcut')
                 
    res.status(200).json(cart.products)
})

const addProduct = Authenticated (async (req, res) =>{
  const { quantity , productId  } = req.body
  const cart = await Cart.findOne({user: req.userId})
  const pExists = cart.products.some(pdoc => productId === pdoc.product.toString())

  if (pExists) {
     await Cart.findOneAndUpdate(
        {_id:cart._id, "products.product":productId},
        {$inc:{"products.$.quantity" : quantity}}
        )
  }else{
    const newProduct = {quantity, product:productId}
    await Cart.findOneAndUpdate(
        {_id:cart._id},
        {$push:{prodcuts:newProduct}} 
        )
  }
  res.status(200).json({message:"product added to cart"})

})