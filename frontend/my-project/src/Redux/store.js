import {configureStore}from "@reduxjs/toolkit"
import  userSlice from "./slice/userslice"
import imageslice from "./slice/imageslice"

const store=configureStore({
    reducer:{
        user:userSlice,
        images:imageslice
    }
})

export default store