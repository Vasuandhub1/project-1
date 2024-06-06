import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { adduser } from '../Redux/slice/userslice'
import {useNavigate} from "react-router-dom"
import axios from "axios"
export default function Login() {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [data,setData]=useState({
        email:"",
        password:""
    })

    const handlechange=(event)=>{
        
        if(event.target.name==="email"){
            setData((prev)=>({...prev,email:event.target.value}))
        }
        if(event.target.name==="password"){
            setData((prev)=>({...prev,password:event.target.value}))
        }
    }
    console.log(data)

    const handleregister=async()=>{
        const res=await axios.post("http://localhost:3000/app/v1/login",data,{withCredentials:true})
       
       console.log(res)
      if(res){
        dispatch(adduser(res.data))
        navigate("/Home")
      }
       console.log(res)
    }

  return (
    <div className=' p-[5%] mr-auto   flex  justify-center  items-center'>
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
        
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" onChange={handlechange} value={data.email} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" onChange={handlechange} value={data.password} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        
        <button type="button" onClick={handleregister}  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Sign up</a>
        </div>
    </form>
</div>

    </div>
  )
}
