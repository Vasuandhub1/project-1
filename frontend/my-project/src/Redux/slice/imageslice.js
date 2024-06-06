import  {createSlice} from "@reduxjs/toolkit"

const imagesSlice=createSlice({
    name:"images",
    initialState:[],
    reducers:{
        setimages:(state,action)=>{
            state=action.payload
        }
    }
})

export const {setimages} = imagesSlice.actions
export default imagesSlice.reducer