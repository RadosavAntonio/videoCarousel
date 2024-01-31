import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store/store'
import { MainNavigation } from './src/navigation/MainNavigation'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  if (__DEV__) {
    import('./ReactotronConfig').then(() => null)
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
