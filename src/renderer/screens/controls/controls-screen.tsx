import type { FC } from 'react'

import { AchievementNotification } from '@app/shared/achievement'

import styles from './controls-screen.module.css'

export const ControlsScreen: FC = () => {
  return (
    <div className={styles.root}>
      <AchievementNotification />
    </div>
  )
}
