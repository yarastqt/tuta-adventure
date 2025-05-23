import { useUnit } from 'effector-react'
import type { FC } from 'react'

import '@app/global.css'
import { ControlsScreen } from '@app/screens/controls'
import { MainMenuScreen } from '@app/screens/main-menu'
import { RouterModel, Routes } from '@app/shared/router'

export const Application: FC = () => {
  const { route } = useUnit({ route: RouterModel.$route })

  switch (route) {
    case Routes.MainMenu:
      return <MainMenuScreen />

    case Routes.Controls:
      return <ControlsScreen />

    default:
      return null
  }
}
