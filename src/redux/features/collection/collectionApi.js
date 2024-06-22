import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {HideLoader, ShowLoader} from "../settings/settingsSlice.js";
import {SetCollectionEditError, SetCollectionError} from "./collectionSlice.js";


export const collectionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCollections: builder.query({
            query: () => `/collection/get-collections`,
            providesTags: ["Collections"],
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //do nothing
                    //console.log(err);
                }
            },
        }),
        getCollection: builder.query({
            query: (id) => `/collection/get-collection/${id}`,
            providesTags: (result, error, arg) => [
                {type: "Collection", id:arg}, //Dynamic Tag
            ],
            keepUnusedDataFor:600,
            async onQueryStarted(arg, {queryFulfilled, }){
                try{
                    const res = await queryFulfilled;
                    // const data = res?.data?.data;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        createCollection: builder.mutation({
            query: (data) => ({
                url: "/collection/create-collection",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Collections"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Collection Create Success");
                    }
                }catch(err) {
                    const status = err?.error?.status;
                    if(status === 409){
                        dispatch(SetCollectionError("This title is already taken!"));
                    }
                    else if(status === 400){
                        dispatch(SetCollectionError("Please provide a file!"));
                    }else{
                        dispatch(SetCollectionError("Something Went Wrong"));
                    }
                }
            }
        }),
        updateCollection: builder.mutation({
            query: ({id,data}) => ({
                url: `/collection/update-collection/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "Collections",
                {type: "Collection", id:arg.id}, //Dynamic Tag
            ],
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Update Success");
                    }
                }catch(err) {
                    //console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            dispatch(SetCollectionEditError("This title is already taken!"));
                        }
                    }
                }
            }
        }),
        updateCollectionWithImage: builder.mutation({
            query: ({id,data}) => ({
                url: `/collection/update-collection-with-image/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "Collections",
                {type: "Collection", id:arg.id}, //Dynamic Tag
            ],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Update Success");
                    }
                }catch(err) {
                    //console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            dispatch(SetCollectionEditError("This title is already taken!"));
                        }
                    }
                }
            }
        }),
        deleteProductImage: builder.mutation({
            query: ({id,data}) => ({
                url: `/product/delete-product-image/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "Products",
                {type: "Product", id:arg.id}, //Dynamic Tag
            ],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    dispatch(ShowLoader())
                    const res = await queryFulfilled;
                    dispatch(HideLoader());
                    if(res?.data?.message === "success"){
                        // SuccessToast("Image Delete Success");
                    }
                }catch(err) {
                    dispatch(HideLoader());
                    console.log(err)
                }
            }
        }),
        deleteCollection: builder.mutation({
            query: (id) => ({
                url: `/collection/delete-collection/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Collections"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err);
                    let status = err?.error?.status;
                }
            }
        }),
    }),
})


export const {useGetCollectionsQuery,useGetCollectionQuery, useCreateCollectionMutation, useUpdateCollectionMutation, useUpdateCollectionWithImageMutation, useDeleteProductImageMutation, useDeleteCollectionMutation} = collectionApi;