import { useIsFocused } from '@react-navigation/native'
import {
  Audio,
  AVPlaybackSource,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from 'expo-av'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

interface Props {
  source: AVPlaybackSource
  indicatorStyle?: StyleProp<ViewStyle>
  videoStyle?: StyleProp<ViewStyle>
  isPaused?: boolean
}

export const VideoPlayer = ({
  source,
  indicatorStyle,
  videoStyle,
  isPaused = false,
}: Props): JSX.Element => {
  const video = React.useRef<Video>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldUseNativeControls, setShouldUseNativeControls] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    })
  }, [])

  useEffect(() => {
    if (isPaused) {
      video.current.pauseAsync()
    }
  }, [isPaused])

  // This is to stop a crash that happens when you navigate to the summary screen and the video is still playing
  // This also has an unintended side effect where it video won't stop playing because of this.
  useEffect(() => {
    setShouldUseNativeControls(isFocused)
  }, [isFocused])

  return (
    <>
      <Video
        ref={video}
        style={videoStyle}
        source={source}
        useNativeControls={shouldUseNativeControls}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        onLoad={() => setIsLoading(false)}
        onPlaybackStatusUpdate={(status: AVPlaybackStatusSuccess) => {
          if (status?.didJustFinish) {
            video.current?.setStatusAsync({
              shouldPlay: true,
              positionMillis: 0,
            })
          }
        }}
      />
      {isLoading && <ActivityIndicator />}
    </>
  )
}
