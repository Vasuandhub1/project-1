import {createSlice} from "@reduxjs/toolkit"

const userSlice= createSlice({
    name:"user",
    initialState:{
        username:"Project"
    }
,
   reducers:{
    adduser:(state,action)=>{
        console.log(action.payload)
        state.username=action.payload
    },
   }
})
export const {adduser}=userSlice.actions
export default userSlice.reducer