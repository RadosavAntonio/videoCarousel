import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../store/store'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { VideoItemBox } from './videoItemBox'
import {
  getAdjustedHeight,
  getAdjustedWidth,
  screenWidth,
} from '../utils/globalUtilityFunctionsAndConstants'
import { fetchVideos } from '../store/thunk/fetchVideos'

export const VideoList = () => {
  const dispatch = useDispatch()
  const videosData = useSelector((store: AppStore) => store.video)
  const displayLoader = videosData.videos.length < videosData.total_results

  return (
    <FlatList
      data={videosData.videos}
      keyExtractor={(item, index) => `${item.id}${index}`}
      renderItem={item => <VideoItemBox item={item.item} />}
      contentContainerStyle={styles.contentContainer}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      maxToRenderPerBatch={8} // optimize Flatlist
      initialNumToRender={8} // optimize Flatlist
      onEndReachedThreshold={0.5} // when is scroll 50%
      onEndReached={() => {
        // @ts-ignore
        dispatch(fetchVideos())
      }}
      ListFooterComponent={() =>
        displayLoader && <ActivityIndicator size="large" />
      }
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: screenWidth,
    paddingHorizontal: getAdjustedWidth(18),
  },

  columnWrapper: {
    justifyContent: 'space-around',
    marginBottom: getAdjustedHeight(18),
  },
})
