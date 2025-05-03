import { createEffect, createEvent, createStore, sample } from 'effector'

import { GameModel } from '@app/shared/game'
import { RouterModel, Routes } from '@app/shared/router'

const startPressed = createEvent()

const $isLoading = createStore(false)

const loadingFx = createEffect(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
})

sample({
  clock: startPressed,
  fn: () => true,
  target: [$isLoading, loadingFx],
})

sample({
  clock: loadingFx.done,
  target: [GameModel.startGame, RouterModel.navigate.prepend(() => Routes.Controls)],
})

export const MainMenuModel = {
  startPressed,
  $isLoading,
}
