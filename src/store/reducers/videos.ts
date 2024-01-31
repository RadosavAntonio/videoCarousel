import { createSlice } from '@reduxjs/toolkit'
import { VideosData } from '../types/videos'

const initialState: VideosData = {
  page: 0,
  per_page: 0,
  videos: [],
  total_results: 0,
}

export const videosSlice = createSlice({
  name: '_videos',
  initialState: initialState,
  reducers: {
    updateData: (state, { payload }) => ({
      ...state,
      page: payload.page,
      per_page: payload.per_page,
      videos: [...state.videos, ...payload.videos],
      total_results: payload.total_results,
    }),
  },
})

export const videosReducer = videosSlice.reducer
export const { updateData } = videosSlice.actions
