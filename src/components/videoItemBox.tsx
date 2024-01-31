import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native'
import {
  getAdjustedHeight,
  getAdjustedWidth,
  screenWidth,
} from '../utils/globalUtilityFunctionsAndConstants'
import { AppNavigationParams, Screen } from '../navigation/navigation'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { VideoItem } from '../store/types/videos'
import { ModalVideo } from './modalVideo'
import { useSelector } from 'react-redux'
import { AppStore } from '../store/store'
import { DisplayVideoType } from '../store/types/modal'

interface Props {
  item: VideoItem
}

export const VideoItemBox = ({ item }: Props): JSX.Element => {
  const displayVideoMode = useSelector(
    (store: AppStore): DisplayVideoType => store.modal.displayVideoMode,
  )

  const navigation = useNavigation<StackNavigationProp<AppNavigationParams>>()
  const onPress = () => {
    if (displayVideoMode === DisplayVideoType.MODAL) {
      setShowModal(true)
    } else {
      navigation.navigate(Screen.VIDEO_ITEM, { id: item.id })
    }
  }

  const [showModal, setShowModal] = useState(false)

  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <ImageBackground source={{ uri: item.image }} style={styles.imageStyle}>
          <View style={styles.pill}>
            <Text>{item.id}</Text>
          </View>
        </ImageBackground>
      </Pressable>

      <ModalVideo
        showModal={showModal}
        itemId={item.id}
        setShowModal={setShowModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  imageStyle: {
    height: getAdjustedHeight(250),
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.4,
  },

  pill: {
    padding: 10,
    backgroundColor: '#8FCDEF',
    borderRadius: 100,
  },
})
