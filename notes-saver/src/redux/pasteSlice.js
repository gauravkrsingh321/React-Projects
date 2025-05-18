import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload; //data which is written by user
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success('Paste Created Successfully');
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);
      if(index >= 0) {
        state.pastes[index] = paste;
      }
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success('Paste Updated Successfully');
    },
    resetAllPastes: (state,action) => {
      state.pastes = [];
      localStorage.removeItem("pastes")
      toast.success('Reset All Pastes Successfully');
    },
    removeFromPastes: (state,action) => {
      const paste = action.payload;
      state.pastes = state.pastes.filter((item)=> item._id !== paste._id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success('Paste Deleted Successfully');
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer