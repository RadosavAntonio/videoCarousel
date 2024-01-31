import { Dimensions, Platform } from 'react-native'
import { isString } from 'lodash'

// Platform -------------------------------------------------------------------
export const isIos = Platform.OS === 'ios'

// DIMENSIONS -------------------------------------------------------------------
export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('screen')

// design based on iPhone 12
export const getAdjustedWidth = (width: number, designScreenWidth = 375) =>
  isString(width) ? width : width * (screenWidth / designScreenWidth)
export const getAdjustedHeight = (height: number, designScreenHeight = 812) =>
  isString(height) ? height : height * (screenHeight / designScreenHeight)
