import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { BackButton } from '../components/backButton'
import { StackScreenProps } from '@react-navigation/stack'
import { AppNavigationParams, Screen } from '../navigation/navigation'
import { useVideoDetailsById } from '../hooks/useVideoDetailsById'
import { VideoPlayer } from '../components/videoPlayer'
import { Carousel } from '../components/carousel'
import { VideoContent } from '../components/videoContent'

type Props = StackScreenProps<AppNavigationParams, Screen.VIDEO_ITEM>

export const VideoScreen = ({ route, navigation }: Props): JSX.Element => {
  const { id } = route.params

  const onItemPress = (itemId: number) =>
    navigation.navigate(Screen.VIDEO_ITEM, { id: itemId })

  const videoDetails = useVideoDetailsById({ videoId: id })

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <VideoContent onItemPress={onItemPress} videoId={id} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1B',
  },
})
