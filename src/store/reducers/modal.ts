import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppStore } from '../store'
import { VideosData } from '../types/videos'
import { DisplayVideoType, ModalData } from '../types/modal'

const initialState: ModalData = {
  displayVideoMode: DisplayVideoType.MODAL,
}

export const modalSlice = createSlice({
  name: '_modal',
  initialState: initialState,
  reducers: {
    displayVideoMode: (state, { payload }) => ({
      ...state,
      displayVideoMode: payload,
    }),
  },
})

export const modalReducer = modalSlice.reducer
export const { displayVideoMode } = modalSlice.actions
