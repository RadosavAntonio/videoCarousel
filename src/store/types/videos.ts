export interface VideoFile {
  id: number
  link: string
  // here can be added the other keys but they are not used on this case
}

export interface VideoItem {
  id: number
  image: string
  video_files: VideoFile[]
  // here can be added the other keys but they are not used on this case
}

export interface VideosData {
  page: number
  per_page: number
  videos: VideoItem[]
  total_results: number
}
