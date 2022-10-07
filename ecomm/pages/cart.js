import baseurl from "../helpers/baseurl"
import{ parseCookies } from 'nookies'
import cookie from  'js-cookie'
import { useRouter } from "next/router"

const cart = ({error ,products}) => {

  const router = useRouter()

  if (error) {
    M.toast({html:error, classes :"red"})
    cookie.remove('user')
    cookie.remove('token')
    router.push('/login')
  }


  return (
    <>Cart</>
  )
}


export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx) 
  if(!token){
    return {
      props :{ products: [] }
    }
  }
  const res = await fetch(`${baseurl}/api/products`,{
      headers :{
       'Authorization':token
      }
    }) 

   const products = await res.json()
   console.log(products)

   if(products.error){
    return {
      props : { error : products.error }
    }
   }

   return {
     props : { products }
   }
}


export default cart