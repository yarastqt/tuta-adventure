import { createEvent, createStore, sample } from 'effector'

export enum Routes {
  Default = 'Default',
  MainMenu = 'MainMenu',
  Controls = 'Controls',
}

const navigate = createEvent<Routes>()

const $route = createStore(Routes.MainMenu)

sample({
  clock: navigate,
  target: $route,
})

export const RouterModel = {
  $route,
  navigate,
}
