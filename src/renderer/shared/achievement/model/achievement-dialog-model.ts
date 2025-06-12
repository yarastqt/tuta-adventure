import { createEvent, createStore, sample } from 'effector'

const openButtonPressed = createEvent()
const closeButtonPressed = createEvent()

const $isOpened = createStore(false)

sample({
  clock: openButtonPressed,
  fn: () => true,
  target: $isOpened,
})

sample({
  clock: closeButtonPressed,
  fn: () => false,
  target: $isOpened,
})

export const AchievementDialogModel = {
  $isOpened,
  closeButtonPressed,
  openButtonPressed,
}
