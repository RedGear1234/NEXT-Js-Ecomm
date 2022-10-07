import React,{useState} from 'react'
import Link from "next/link"
import baseurl from "../helpers/baseurl"
import {parseCookies} from "nookies"

const create = () => {

const [Name, setName] = useState("")
const [Price, setPrice] = useState("")
const [Media, setMedia] = useState('')
const [Description, setDescription] = useState("")


const handleSubmit  =  async (e) =>{
  e.preventDefault()
  try {
    const mediaUrl = await imageUpload()
    const res= await fetch(`${baseurl}/api/products`, {
      method : "POST",
      headers :{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        Name,
        Price,
        mediaUrl,
        Description
      })
    })
    const res2 = await res.json()
    if(res2.error){
        M.toast({html: res2.error, classes:"red"})
      }
      else{
      M.toast({html: "Product Saved", classes:"green"})
    }
  } catch (error) {
    console.log(error)
  }
   
}

const imageUpload = async () =>{
 const data = new FormData()
 data.append('file',Media)
 data.append('upload_preset' ,"eComm")
 data.append('cloud_name', "dlo9j7odf")
 const res = await fetch('https://api.cloudinary.com/v1_1/dlo9j7odf/image/upload', {
  method: "POST",
  body: data
 })
 const res2 = await res.json()
 return res2.url
}




  return (
    <form className='container' onSubmit={(e)=> handleSubmit(e)}>
       <input type="text" name='name' placeholder='Name Product' value={Name} onChange={(e) => {setName(e.target.value)}} />
       <input type="text" name='price' placeholder='Name Price' value={Price} onChange={(e) => {setPrice(e.target.value)}} />
       <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file"  
            accept='image/*' 
            onChange={(e)=> setMedia(e.target.files[0])} name='mediaUrl'/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
       </div>
       <img className='responsive-img' src={Media? URL.createObjectURL(Media) : ""}></img>
       <textarea className="materialize-textarea" name='description' placeholder='Description' value={Description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
      <button className="btn waves-effect waves-light" type="submit" >Submit
        <i className="material-icons right">send</i>
      </button>
    </form>
  )
}


export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx)
  const user = cookie.user ? parseCookies(cookie.user) : ""
  if (user.role != 'admin') {
    const {res} = ctx
    res.writeHead(302, {Location: "/"})
    res.end()
  }

  return {
    props : {}
  }
}



export default create