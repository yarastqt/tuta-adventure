import { useUnit } from 'effector-react'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import type { FC } from 'react'

import { Easings } from '@app/shared/ui'

import { AchievementDialogModel } from '../../model/achievement-dialog-model'
import { AchievementModel } from '../../model/achievement-model'
import styles from './achievement-dialog.module.css'

const UnderlayVariants: Variants = {
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
      duration: 0.2,
      ease: Easings.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: Easings.easeIn,
    },
  },
}

const DialogVariants: Variants = {
  exit: {
    opacity: 0,
    transform: 'translateY(12px)',
    transition: {
      duration: 0.2,
      ease: Easings.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: {
      delay: 0.3,
      duration: 0.3,
      ease: Easings.easeIn,
    },
  },
}

export const AchievementDialog: FC = () => {
  const { achievements, isOpened, onCloseButtonPress } = useUnit({
    achievements: AchievementModel.$achievements,
    isOpened: AchievementDialogModel.$isOpened,
    onCloseButtonPress: AchievementDialogModel.closeButtonPressed,
  })

  return (
    <AnimatePresence>
      {isOpened && (
        <div className={styles.root}>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={UnderlayVariants}
            className={styles.underlay}
          />
          <motion.div
            animate="enter"
            exit="exit"
            initial="exit"
            variants={DialogVariants}
            className={styles.dialog}
          >
            <div>Достижения</div>
            <button onClick={onCloseButtonPress}>Закрыть</button>
            <div>
              {achievements.map((achievement) => (
                <div key={achievement.id}>
                  <div>
                    {achievement.title} {achievement.isCompleted && 'Завершено'}
                  </div>
                  <div>{achievement.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
