import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    collectionDeleteModalOpen:false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        SetCollectionDeleteModalOpen:(state,action)=>{
            state.collectionDeleteModalOpen=action.payload
        },
    }

})


export const {SetCollectionDeleteModalOpen} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;