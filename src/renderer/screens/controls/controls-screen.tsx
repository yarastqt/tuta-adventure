import type { FC } from 'react'

import { AchievementButton, AchievementNotification } from '@app/shared/achievement'

import styles from './controls-screen.module.css'

export const ControlsScreen: FC = () => {
  return (
    <div className={styles.root}>
      <AchievementNotification />
      <AchievementButton />
    </div>
  )
}
