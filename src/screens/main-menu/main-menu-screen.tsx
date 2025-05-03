import cx from 'clsx'
import { useUnit } from 'effector-react'
import { AnimatePresence, type Variants, motion } from 'motion/react'
import type { FC } from 'react'

import { Paw } from '@app/shared/icons'
import { Easings, TextButton } from '@app/shared/ui'

import styles from './main-menu-screen.module.css'
import { MainMenuModel } from './model'

const LoaderIncicator = motion.create(Paw)

const LoaderVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.4,
      ease: Easings.easeIn,
      staggerChildren: 0.2,
    },
  },
}

const IncicatorVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: Easings.easeInOut,
      repeat: Infinity,
      repeatType: 'mirror',
    },
  },
}

const MenuVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.2,
      ease: Easings.easeIn,
    },
  },
}

const VersionVariants: Variants = {
  initial: {
    opacity: 0,
    transform: 'translateY(8px)',
  },
  animate: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: {
      delay: 0.8,
      duration: 0.2,
      ease: Easings.easeIn,
    },
  },
}

export const MainMenuScreen: FC = () => {
  const { isLoading, onStartPress } = useUnit({
    isLoading: MainMenuModel.$isLoading,
    onStartPress: MainMenuModel.startPressed,
  })

  return (
    <div className={styles.root}>
      {!isLoading && (
        <motion.div layoutId="cover" className={styles.cover} initial={{ borderRadius: 24 }} />
      )}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={cx(styles.cover, styles.cover_isLoading)}
            layoutId="cover"
            animate={{ borderRadius: 0 }}
          >
            <motion.div
              animate="animate"
              className={styles.loader}
              initial="initial"
              variants={LoaderVariants}
            >
              <LoaderIncicator size={24} variants={IncicatorVariants} />
              <LoaderIncicator size={24} variants={IncicatorVariants} />
              <LoaderIncicator size={24} variants={IncicatorVariants} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.menu}
        variants={MenuVariants}
        initial="initial"
        animate="animate"
      >
        <div className={styles.list}>
          <TextButton color="primary" onPress={onStartPress}>
            Играть
          </TextButton>

          <TextButton color="secondary" onPress={() => null}>
            Настройки
          </TextButton>
        </div>

        <motion.div
          animate="animate"
          className={styles.version}
          initial="initial"
          variants={VersionVariants}
        >
          v 0.0.0
        </motion.div>
      </motion.div>
    </div>
  )
}
