import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Pressable,
  Text,
} from 'react-native'
import { screenWidth } from '../utils/globalUtilityFunctionsAndConstants'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../store/store'
import { fetchVideos } from '../store/thunk/fetchVideos'

interface Props {
  onImagePress: (id: number) => void
}

export const Carousel = ({ onImagePress }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const carouselImages = useSelector((store: AppStore) => store.video.videos)

  const scrollX = useRef(new Animated.Value(0)).current
  const [selectedIndex, setSelectedIndex] = useState(0)
  const setIndex = e => {
    const viewSize = e.nativeEvent.layoutMeasurement.width
    const contentOffset = e.nativeEvent.contentOffset.x
    const newIndex = Math.floor(contentOffset / viewSize)
    setSelectedIndex(newIndex)
  }

  const getOpacity = (num: number) => {
    if (num === selectedIndex) {
      return 1
    }
    return 0.33
  }

  useEffect(() => {
    if (selectedIndex >= carouselImages.length - 5) {
      //@ts-ignore
      dispatch(fetchVideos())
    }
  }, [selectedIndex, carouselImages])

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}>
        {carouselImages.map((image, index) => {
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ]

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.33, 1, 0.33],
          })

          return (
            <Pressable onPress={() => onImagePress(image.id)} key={image.id}>
              <Animated.Image
                key={image.id}
                source={{ uri: image.image }}
                style={[styles.image, { opacity }]}
              />
            </Pressable>
          )
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}>
        <View style={styles.pill}>
          <Text
            style={{
              color: 'white',
            }}>{`${selectedIndex + 1} / ${carouselImages.length}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  image: {
    width: screenWidth - 24,
    height: 250,
    resizeMode: 'cover',
  },

  pill: {
    backgroundColor: '#191A1B',
    padding: 10,
    borderRadius: 100,
  },
})
