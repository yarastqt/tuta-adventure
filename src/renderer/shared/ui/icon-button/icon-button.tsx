import { motion } from 'motion/react'
import type { FC, ReactNode } from 'react'

import styles from './icon-button.module.css'

export interface IconButtonProps {
  children: ReactNode
  onPress: () => void
  shape: 'circled' | 'rounded'
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, onPress, shape } = props

  return (
    <motion.button
      className={styles.root}
      data-shape={shape}
      onClick={onPress}
      whileTap={{ opacity: 0.5 }}
    >
      {children}
    </motion.button>
  )
}
