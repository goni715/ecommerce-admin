import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice.js";
import authSliceReducer from "../features/auth/authSlice.js";
import userSliceReducer from "../features/user/userSlice.js";
import modalSliceReducer from "../features/modal/modalSlice.js";
import {settingsSliceReducer} from "../features/settings/settingsSlice.js";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer,
        user: userSliceReducer,
        modal: modalSliceReducer,
        settings:settingsSliceReducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})


export default store;