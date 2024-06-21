import {createSlice} from "@reduxjs/toolkit";

export const settingsSlice=createSlice({

    name:'settings',
    initialState:{
        loader:"hidden"
    },
    reducers:{
        ShowLoader:(state)=>{
            state.loader=""
        },
        HideLoader:(state)=>{
            state.loader="hidden"
        }
    }

})

export  const {ShowLoader,HideLoader}=settingsSlice.actions;
export const selectLoader = (state) => state.settings.loader;
export const settingsSliceReducer = settingsSlice.reducer;