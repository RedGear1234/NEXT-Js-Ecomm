import { useRouter } from "next/router"
import baseurl from "../../helpers/baseurl"
import { useRef,useEffect,useState } from "react"
import {parseCookies} from "nookies"
import cookie2 from 'js-cookie'

const Product = ({product})=>{

  const[quantity, setQuantity] = useState(1)
  const router = useRouter()
  const cookieuser= parseCookies()
  const user = cookieuser.user ? parseCookies(cookieuser.user) : ""
  const modalRef = useRef(null)

  useEffect(() => {
    M.Modal.init(modalRef.current)
  },[] )

  if (router.isFallback) {
    return (
      <h3>Loading...</h3>
    )
  }

  const getModal = () =>{
    return (
      <div id="modal1" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4 style={{color: "black"}}>{product.name}</h4>
        <p style={{color: "black"}}>Are you sure you want to delete ?</p>
      </div>
      <div className="modal-footer">
      <button className="btn waves-effect waves-light #e53935 blue darken-1">
        Cancel
      </button>
      <button className="btn waves-effect waves-light #e53935 red darken-1" onClick={()=> deleteProduct()}>
        Yes
      </button>
      </div>
    </div>
    )
  }

   const deleteProduct = async () =>{
    const res = await fetch(`${baseurl}/api/product/${product._id}`,{
      method:"DELETE"
    })
    const res2 = await res.json()
    router.push("/")
  }


  const AddToCart =  async () =>{
    const res = await fetch(`${baseurl}/api/cart`,{
      method: "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookieuser.token
      },
      body:JSON.stringify({
         quantity,
         productId: product._id
      })
    })
    const res2 = await res.json()
    console.log(res2)
  }

    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaUrl} alt="prduct img" style={{width: "30%"}}/>
            <h5>Rs.{product.price}</h5>
            <input type="number" style={{width: "400px", margin: "10px"}} min="1" placeholder="Quantity" value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}/>
            {user ? 
             <button className="btn waves-effect waves-light" onClick={()=> AddToCart()}>Add
              <i className="material-icons right">add</i>
            </button> 
            : 
            <button className="btn waves-effect waves-light" onClick={()=> router.push('/login')}>Login to Add
              <i className="material-icons right">add</i>
            </button> 
            }
            <p>{product.description}</p>
            {user.role == 'user'
            &&
            <button className="btn waves-effect waves-light #e53935 red darken-1 modal-trigger" data-target="modal1">Delete
              <i className="material-icons left">delete</i>
            </button>
            }
            {getModal()}
        </div>
    )
}

// export async function getServerSideProps({params:{id}}) {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`)
//   const data = await res.json()
//     return{
//       props:{product :data}
//     }
// }

export async function getStaticProps({params:{id}}) {
  const res = await fetch(`${baseurl}/api/product/${id}`)
  const data = await res.json()
    return{
      props:{product :data}
    }
}

export async function getStaticPaths(){
  return {
    paths:[
      {params : { id: "633afa2c2cd242b160d1bf1c" } } //see the "paths" section below
    ],
    fallback :true
  }
}



export default Product