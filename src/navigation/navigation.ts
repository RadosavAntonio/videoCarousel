export enum Screen {
  HOME = 'Home',
  VIDEO_ITEM = 'Video Item',
}

export type AppNavigationParams = {
  [Screen.HOME]: undefined
  [Screen.VIDEO_ITEM]: { id: number }
}
