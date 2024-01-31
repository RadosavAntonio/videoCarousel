import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from '../../ReactotronConfig'
import { videosReducer } from './reducers/videos'
import { VideosData } from './types/videos'
import { modalReducer } from './reducers/modal'
import { ModalData } from './types/modal'
// import { logger } from 'redux-logger'

export interface AppStore {
  video: VideosData
  modal: ModalData
}

const rootReducer = combineReducers({
  video: videosReducer,
  modal: modalReducer,
})

// Persistor configuration
const configuration = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: [], // I persist videos for performance reasons
  blacklist: ['modal', 'video'],
}
const persistedReducer = persistReducer(configuration, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Add the action that's causing the error
      },
    }),
  enhancers: getDefaultEnhancers => {
    return getDefaultEnhancers().concat([Reactotron.createEnhancer!()])
  },
})

export const persistor = persistStore(store)
