import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {HideLoader, ShowLoader} from "../settings/settingsSlice.js";


export const collectionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/product/get-all-product`,
            providesTags: ["Products"],
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
        getProduct: builder.query({
            query: (id) => `/product/get-product/${id}`,
            providesTags: (result, error, arg) => [
                {type: "Product", id:arg}, //Dynamic Tag
            ],
            keepUnusedDataFor:600,
            async onQueryStarted(arg, {queryFulfilled, }){
                try{
                    const res = await queryFulfilled;
                    // const data = res?.data?.data;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
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
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Product Create Success");
                    }
                }catch(err) {
                    console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            ErrorToast("Failled! Product Name Already Existed")
                        }
                    }
                }
            }
        }),
        updateProduct: builder.mutation({
            query: ({id,data}) => ({
                url: `/product/update-product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "Products",
                {type: "Product", id:arg.id}, //Dynamic Tag
            ],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Update Success");
                    }
                }catch(err) {
                    console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            ErrorToast("Failled! Product Name Already Existed")
                        }
                    }
                }
            }
        }),
        updateProductWithImage: builder.mutation({
            query: ({id,data}) => ({
                url: `/product/update-product-with-image/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "Products",
                {type: "Product", id:arg.id}, //Dynamic Tag
            ],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Update Success");
                    }
                }catch(err) {
                    console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            ErrorToast("Failled! Product Name Already Existed")
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
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete-product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    console.log(err);
                    let status = err?.error?.status;
                    if(status === 403){
                        ErrorToast("Failld ! This category is associated with Product");
                    }

                }
            }
        }),
    }),
})


export const {useGetProductsQuery,useGetProductQuery, useCreateCollectionMutation, useUpdateProductMutation, useUpdateProductWithImageMutation, useDeleteProductImageMutation, useDeleteProductMutation} = collectionApi;