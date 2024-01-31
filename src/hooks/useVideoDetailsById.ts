import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../store/store'
import { VideoItem } from '../store/types/videos'

interface Props {
  videoId: number
}

export const useVideoDetailsById = ({ videoId }: Props): VideoItem => {
  const videosData = useSelector((store: AppStore) => store.video.videos)

  const videoDetails = videosData.find(
    (video: VideoItem) => video.id === videoId,
  )

  return videoDetails
}
