import { useUnit } from 'effector-react'
import type { FC } from 'react'

import { AchievementModel } from '../../model/achievement-model'
import styles from './achievement-notification.module.css'

export const AchievementNotification: FC = () => {
  const { completedAchievement, isShown } = useUnit({
    completedAchievement: AchievementModel.$completedAchievement,
    isShown: AchievementModel.$isShown,
  })

  if (!isShown || !completedAchievement) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={styles.icon}></div>
      <div className={styles.content}>
        <div className={styles.title}>Достижение получено</div>
        <div className={styles.description}>{completedAchievement.title}</div>
      </div>
    </div>
  )
}
