import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    error: "",
    editError: "",
    collectionId:""
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        SetCollectionError : (state, action)=>{
            state.error=action.payload;
        },
        SetCollectionEditError : (state, action)=>{
            state.editError=action.payload;
        },
        SetCollectionId : (state, action)=>{
            state.collectionId=action.payload;
        },
    }
})



export const {SetCollectionError, SetCollectionEditError, SetCollectionId} = collectionSlice.actions;

const collectionSliceReducer = collectionSlice.reducer;
export default collectionSliceReducer;