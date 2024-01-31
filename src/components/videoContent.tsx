import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Carousel } from './carousel'
import { VideoPlayer } from './videoPlayer'
import { useVideoDetailsById } from '../hooks/useVideoDetailsById'

interface Props {
  onItemPress: (itemId: number) => void
  videoId: number
}

export const VideoContent = ({ onItemPress, videoId }: Props): JSX.Element => {
  const [videoItemId, setVideoItemId] = useState(videoId)

  const videoDetails = useVideoDetailsById({ videoId: videoItemId })

  return (
    <View style={styles.contentContainer}>
      <Carousel onImagePress={setVideoItemId} />
      <View style={styles.videoContainer}>
        <VideoPlayer
          source={{
            uri: videoDetails.video_files[0].link,
          }}
          indicatorStyle={styles.indicatorStyle}
          videoStyle={styles.video}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 32,
    marginHorizontal: 12,
  },

  video: {
    width: '100%',
    height: 225,
    borderRadius: 18,
  },

  indicatorStyle: {
    marginBottom: 10,
  },

  videoContainer: {
    marginTop: 32,
  },
})
