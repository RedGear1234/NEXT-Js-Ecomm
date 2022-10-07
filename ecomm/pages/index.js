import Link from "next/link"
import {useState, useEffect } from "react"
import baseurl from "../helpers/baseurl"

const Home = ({products})=>{

  const productList =  products.map(product =>{
    return (
       <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl}/>
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>Rs.{product.price}</p>
        </div>
        <div className="card-action">
          <Link href={"./product/[id]"} as={`/product/${product._id}`}><a>View Product</a></Link>
        </div>
      </div>
    )
  })
  
  return(
    <div className="rootcard">
        {productList}  
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${baseurl}/api/products`)
  const data = await response.json()
  
  return {
    props : {
      products: data
    }
  }
}



export default Home



