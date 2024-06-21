import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    ForgotError: "",
    VerifyOtpError: "",
    NewPasswordError: "",
    LoginError: "",
    RegisterError: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ShowLoading : (state)=>{
            state.loading=true;
        },
        HideLoading : (state)=>{
            state.loading=false;
        },
        SetForgotError : (state, action)=>{
            state.ForgotError=action.payload;
        },
        SetVerifyOtpError : (state, action)=>{
            state.VerifyOtpError=action.payload;
        },
        SetNewPasswordError : (state, action)=>{
            state.NewPasswordError=action.payload;
        },
        SetLoginError : (state, action)=>{
            state.LoginError=action.payload;
        },
        SetRegisterError : (state, action)=>{
            state.RegisterError=action.payload;
        }
    }
})



export const {ShowLoading, HideLoading, SetForgotError, SetVerifyOtpError, SetNewPasswordError, SetLoginError, SetRegisterError} = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;