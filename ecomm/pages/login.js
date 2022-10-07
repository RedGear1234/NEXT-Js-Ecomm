import React,{useState} from 'react'
import baseurl from "../helpers/baseurl"
import Link from "next/link"
import cookie from "js-cookie"
import {useRouter} from "next/router"

const login = () => {

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const router = useRouter()

const userLogin = async (e) =>{
  e.preventDefault()
  const res = await fetch(`${baseurl}/api/login`, {
    method : "POST",
    headers :{
      "Content-Type" :"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  })

  const res2 = await res.json()
   if (res2.error) {
    M.toast({html: res2.error, classes:"red"})
   }else{
    console.log(res2)
    cookie.set(`token`, res2.token)
    cookie.set("user", res2.user)
    router.push("/account")
   }
}


  return (
    <div className='container authcard center-align'>
      <h3>Login</h3>
     <form onSubmit={(e)=> userLogin(e)}>
      <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit">Login
        <i className="material-icons right">forward</i>
      </button>
      <Link href="/login"><a><h6>Don't have account ?</h6></a></Link>
     </form>
    </div>
  )
}

export default login