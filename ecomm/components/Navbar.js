import React from 'react'
import  Link  from 'next/link'
import { useState,useEffect } from 'react'
import {parseCookies}from "nookies"
import {useRouter} from "next/router"
import cookie from 'js-cookie'


const Navbar = () => {

const router = useRouter()
const cookieuser = parseCookies()
// const {token} = parseCookies()
// const user =  cookieuser.user ? parseCookies(cookieuser.user) : ""

const [user, setuser]= useState('')

useEffect(() => {
  setuser(cookieuser.user ? parseCookies(cookieuser.user) : "")
},[router])


   function isActive(route){
     if(route == router.pathname){
         return "active"
     }
     else ""
  }

  return (
      <nav>
        <div className="nav-wrapper #1e88e5 blue darken-1">
          <Link href="/"><a className="brand-logo left">Ecomm</a></Link>
          <ul id="nav-mobile" className="right">
            <li className={isActive("/cart")}><Link href="/cart"><a>Cart</a></Link></li>
            {
             (user.role == 'admin' && user.role =='root' ) &&
              <li className={isActive("/create")}><Link href="/create"><a>Create</a></Link></li>
            }
  
            { user ? 
            <> 
              <li className={isActive("/account")}><Link href="/account" ><a>Account</a></Link></li>
              <li><button className='btn red' onClick={()=>{
                cookie.remove('token')
                cookie.remove('user')
                router.push('/login')}}>logout</button></li> 
            </>
              : 
            <>
              <li className={isActive("/login")}><Link href="/login" ><a>login</a></Link></li>
              <li className={isActive("/signup")}><Link href="/signup"><a>SignUp</a></Link></li> 
            </>
            }

          </ul>
        </div>
      </nav>
  )
}

export default Navbar


