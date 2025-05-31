import { useUnit } from 'effector-react'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import type { FC } from 'react'

import { Easings } from '@app/shared/ui'

import { AchievementModel } from '../../model/achievement-model'
import styles from './achievement-notification.module.css'

const RootVariants: Variants = {
  exit: {
    opacity: 0,
    transform: 'translateY(-12px)',
    transition: {
      duration: 0.2,
      ease: Easings.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: {
      duration: 0.2,
      ease: Easings.easeIn,
    },
  },
}

export const AchievementNotification: FC = () => {
  const { completedAchievement, isShown } = useUnit({
    completedAchievement: AchievementModel.$completedAchievement,
    isShown: AchievementModel.$isShown,
  })

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          className={styles.root}
          animate="enter"
          initial="exit"
          exit="exit"
          variants={RootVariants}
        >
          <div className={styles.icon}></div>
          <div className={styles.content}>
            <div className={styles.title}>Достижение получено</div>
            <div className={styles.description}>{completedAchievement?.title}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
