import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos } from '../store/thunk/fetchVideos'
import { AppStore } from '../store/store'
import { VideoList } from '../components/videolist'
import { displayVideoMode } from '../store/reducers/modal'
import { DisplayVideoType } from '../store/types/modal'

export const Home = () => {
  const dispatch = useDispatch()
  const videosData = useSelector((store: AppStore) => store.video)
  const displayMode = useSelector(
    (store: AppStore): DisplayVideoType => store.modal.displayVideoMode,
  )

  useEffect(() => {
    // @ts-ignore
    !videosData.page && dispatch(fetchVideos())
  }, [])

  const [isModal, setIsModal] = useState(displayMode === DisplayVideoType.MODAL)
  useEffect(() => {
    setIsModal(displayMode === DisplayVideoType.MODAL)
  }, [displayMode])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>How would you like to open the video:</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Modal"
            onPress={() => dispatch(displayVideoMode(DisplayVideoType.MODAL))}
            color={isModal ? 'green' : 'pink'}
          />
          <Button
            title="Screen"
            onPress={() => dispatch(displayVideoMode(DisplayVideoType.SCREEN))}
            color={!isModal ? 'green' : 'pink'}
          />
        </View>
      </View>
      <VideoList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#191A1B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white',
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
