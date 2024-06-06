import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { adduser } from '../Redux/slice/userslice'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Home() {
    const data=useSelector((state)=>state.user.username)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [modal,setModal]=useState(false)
    const [images,setImages]=useState([])
    const [view,setview]=useState({views:"",imageurl:"",show:false})
    const [file,setfile]=useState({title:"",
        file:""
    })
    const image=async()=>{
         const imagesData=await axios.get("http://localhost:3000/app/v1/allimages",{withCredentials:true})
         setImages([...imagesData.data])
        
    }

    const handleUpload=async()=>{
        const formdata=new FormData()
        formdata.append("files",file.file)
        formdata.append("title",file.title)
     const sucess= await axios.post("http://localhost:3000/app/v1/image",formdata,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
     if(sucess){
        alert("image uploaded sucessfully")
        setModal(false)
        setfile((prev)=>({file:"",title:""}))
     }
     console.log(sucess)
    }
    const handelAddFile=(event)=>{
       
        if(event.target.name==="file"){
            setfile((prev)=>({...prev,file:event.target.files[0]}))
        }
        if(event.target.name==="title"){
            setfile((prev)=>({...prev,title:event.target.value}))
            
        }
    }
    const handleView=async(index)=>{

        console.log(images[index])
        setview((prev)=>({imageurl:images[index].imageurl,views:images[index].views,show:true}))
        console.log(view)
        images.map((elem,ind)=>{
            if(index==ind){
                elem.views++;
            }
        })
        // now call the api to update the views
        const updateview=await axios.get(`http://localhost:3000/app/v1/specific/${images[index]._id}`,{withCredentials:true})
        console.log(updateview)
    }
    const handlelogout=()=>{
        dispatch(adduser,"Project")
        navigate("/login")
        window.location.reload()
    }
    const handleViewClose=()=>{
        setview((prev)=>({show:false}))
    }
    
    const handelAddImage=()=>{
        if(modal){
            setModal(false)
        }else{
            setModal(true)
        }
    }
    
    useEffect(()=>{
        image()
        
    },[images])
    console.log(images)
    
  return (
    <div>
      

<nav class=" sticky border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{data}</span>
    </a>
    <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li className='flex'>
          <div class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page"><button type="button" onClick={handelAddImage} class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Add image</button></div>
          <div class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page"><button type="button" onClick={(handlelogout)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log out</button></div>
        </li>
      </ul>
    </div>
  </div> 
</nav>
<div className='p-[2rem]'>
    

{modal?<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed flex  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add new image to gallary
                </h3>
                <button type="button" onClick={handelAddImage} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-4 md:p-5">
                <div class="space-y-4" >
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image title </label>
                        <input type="tiitle" onChange={handelAddFile} value={file.title} name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Title" required />
                    </div>
                    <div className=''>
                        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your image:- Format:( jpg , jpeg , svg )</label>
                        <input type="file" onChange={handelAddFile} name="file" id="file"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    
                    <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleUpload}>Upload...</button>
                    
                </div>
            </div>
        </div>
    </div>
</div> :null}
{/* enlarge image */}
{view.show?<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed flex  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Enlarged image
                </h3>
                <button type="button" onClick={handleViewClose} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-4 md:p-5">
                <div class="space-y-4" >
                   
                <div>
        <img class="h-auto max-w-full rounded-lg" src={view.imageurl} alt=""/>
               </div>
               <div>
                <h3>Views:{view.views}</h3>
               </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
</div>:null}
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    
   {images.map((elem,index)=>{
    
    return(
        <div key={index} >
        <img onClick={()=>handleView(index)} class="h-auto max-w-full rounded-lg" src={elem.imageurl} alt=""/>
    </div>
    )
   })}
    
</div>

</div>

    </div>
  )
}
