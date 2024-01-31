import React from 'react'
import { AppNavigationParams, Screen } from './navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/home'
import { VideoScreen } from '../screens/videoScreen'

const AppStack = createStackNavigator<AppNavigationParams>()

export const MainNavigation = (): JSX.Element => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        // header: () => null,
        // gestureEnabled: false,
        // navigationBarColor: , // for android bar
      }}
      initialRouteName={Screen.HOME}>
      <AppStack.Screen name={Screen.HOME} component={Home} />
      <AppStack.Screen name={Screen.VIDEO_ITEM} component={VideoScreen} />
    </AppStack.Navigator>
  )
}
