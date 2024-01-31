import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateData } from '../reducers/videos'
import { AppStore } from '../store'

export const fetchVideos = createAsyncThunk<any, any>(
  'videos/fetchPopularVideos',
  async (_payload, { dispatch, getState }) => {
    const pageNumber = (getState() as AppStore).video.page + 1
    const pageSize = (getState() as AppStore).video.per_page || 15
    const url = `https://api.pexels.com/v1/videos/popular/?page=${pageNumber}&per_page=${pageSize}`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          '1IleyPC00zRAZNHEDN72zLWKpPzxGjOAFEj0bTWgiqoPPnnGINDzLcoW',
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateData(data))
      })
      .catch(error => {
        console.error('Error:', error)
      })
  },
)
