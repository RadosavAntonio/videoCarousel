import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { getAdjustedWidth } from '../utils/globalUtilityFunctionsAndConstants'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationParams, Screen } from '../navigation/navigation'
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
  onPress?: () => void
}

export const BackButton = ({ onPress }: Props): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<AppNavigationParams>>()

  const onBackPress = () => {
    onPress && onPress()
    navigation.navigate(Screen.HOME)
  }

  return (
    <Pressable onPress={onBackPress} style={styles.container}>
      <Text>Back</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: getAdjustedWidth(44),
    height: getAdjustedWidth(44),
    borderRadius: getAdjustedWidth(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: getAdjustedWidth(18),
  },
})
