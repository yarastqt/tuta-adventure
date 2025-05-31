import { motion } from 'motion/react'
import type { FC } from 'react'

import styles from './text-button.module.css'

export interface TextButtonProps {
  children: string
  color: 'primary' | 'secondary'
  onPress: () => void
}

export const TextButton: FC<TextButtonProps> = (props) => {
  const { children, color, onPress } = props

  return (
    <motion.button
      className={styles.root}
      data-color={color}
      onClick={onPress}
      whileTap={{ opacity: 0.5 }}
    >
      {children}
    </motion.button>
  )
}
