import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Modal, TouchableOpacity, StyleSheet, View, Button } from 'react-native'
import { AppNavigationParams, Screen } from '../navigation/navigation'
import { VideoContent } from './videoContent'

interface Props {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  itemId: number
}

export const ModalVideo = ({
  showModal,
  itemId,
  setShowModal,
}: Props): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<AppNavigationParams>>()

  const onItemPress = (itemId: number) => {}

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      presentationStyle={'overFullScreen'}
      onRequestClose={() => {
        setShowModal(!showModal)
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => setShowModal(!showModal)}>
        <VideoContent onItemPress={onItemPress} videoId={itemId} />
        <Button title="Exit" onPress={() => setShowModal(!showModal)} />
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
})
