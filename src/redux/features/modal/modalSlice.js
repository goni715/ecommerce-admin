import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    doctorCreateModalOpen:false,
    doctorEditModalOpen:false,
    doctorDeleteModalOpen:false,
    appointmentDeleteModalOpen:false,
    appointmentEditModalOpen:false,
    appointmentCreateModalOpen:false,
    reportCreateModalOpen:false,
    invoiceUpdateModalOpen:false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        SetDoctorCreateModalOpen:(state,action)=>{
            state.doctorCreateModalOpen=action.payload
        },
        SetDoctorEditModalOpen:(state,action)=>{
            state.doctorEditModalOpen=action.payload
        },
        SetDoctorDeleteModalOpen:(state,action)=>{
            state.doctorDeleteModalOpen=action.payload
        },
        SetAppointmentDeleteModalOpen:(state,action)=>{
            state.appointmentDeleteModalOpen=action.payload
        },
        SetAppointmentEditModalOpen:(state,action)=>{
            state.appointmentEditModalOpen=action.payload
        },
        SetAppointmentCreateModalOpen:(state,action)=>{
            state.appointmentCreateModalOpen=action.payload
        },
        SetReportCreateModalOpen:(state,action)=>{
            state.reportCreateModalOpen=action.payload
        },
        SetInvoiceUpdateModalOpen:(state,action)=>{
            state.invoiceUpdateModalOpen=action.payload
        },
    }

})


export const {SetDoctorCreateModalOpen, SetDoctorEditModalOpen, SetDoctorDeleteModalOpen, SetAppointmentDeleteModalOpen, SetAppointmentEditModalOpen, SetAppointmentCreateModalOpen, SetReportCreateModalOpen, SetInvoiceUpdateModalOpen} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;