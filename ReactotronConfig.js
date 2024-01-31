import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'React Native Demo',
  })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: { veto: stackFrame => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .use(reactotronRedux())
  .connect()

Reactotron.clear()

export default reactotron

export const connect = () => {
  Reactotron.connect()
}
