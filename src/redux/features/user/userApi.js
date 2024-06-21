import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast} from "../../../helper/ValidationHelper.js";



export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/user/get-all-user`,
            providesTags: ["Users"],
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),
        makeAdmin: builder.mutation({
            query: (id) => ({
                url: `/auth/make-admin/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Users"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        // SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err)
                }
            }
        }),
        removeAdmin: builder.mutation({
            query: (id) => ({
                url: `/auth/remove-admin/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Users"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        // SuccessToast(" Success");
                    }
                }catch(err) {
                    let status = err?.error?.status;
                    if(status===400) {
                        ErrorToast("minimum have to be an one admin");
                    }
                    //console.log(err)
                }
            }
        }),
        banUser: builder.mutation({
            query: (id) => ({
                url: `/auth/ban-user/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Users"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        // SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err)
                }
            }
        }),
        unbanUser: builder.mutation({
            query: (id) => ({
                url: `/auth/unban-user/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Users"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        // SuccessToast(" Success");
                    }
                }catch(err) {
                    let status = err?.error?.status;
                    if(status===400) {
                        ErrorToast("minimum have to be an one admin");
                    }
                    //console.log(err)
                }
            }
        }),
    }),
})


export const {useGetUsersQuery, useMakeAdminMutation, useRemoveAdminMutation,useBanUserMutation, useUnbanUserMutation} = userApi;