import { allSettled } from 'effector'
import { Provider } from 'effector-react'
import { createRoot } from 'react-dom/client'
import invariant from 'ts-invariant'

import { Application } from '@app/application'
import { GameModel } from '@app/shared/game'

import { scope } from './shared/system/scope'

async function render() {
  const rootElement = document.getElementById('app-root')

  invariant(rootElement)

  const root = createRoot(rootElement)
  await allSettled(GameModel.createGame, { scope })

  root.render(
    <Provider value={scope}>
      <Application />
    </Provider>,
  )
}

render()
