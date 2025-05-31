import { allSettled, fork } from 'effector'
import { Provider } from 'effector-react'
import { createRoot } from 'react-dom/client'
import invariant from 'ts-invariant'

import { Application } from '@app/application'
import { GameModel } from '@app/shared/game'

async function render() {
  const rootElement = document.getElementById('app-root')

  invariant(rootElement)

  const root = createRoot(rootElement)
  const scope = fork()

  await allSettled(GameModel.createGame, { scope })

  root.render(
    <Provider value={scope}>
      <Application />
    </Provider>,
  )
}

render()
