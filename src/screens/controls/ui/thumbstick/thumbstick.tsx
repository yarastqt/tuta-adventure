import { type PanInfo, animate, motion, useMotionValue } from 'motion/react'
import { type FC } from 'react'

import { Paw } from '@app/shared/icons'

import styles from './thumbstick.module.css'

export const Thumbstick: FC = () => {
  const radius = 56

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const onPanHandler = (_event: unknown, info: PanInfo) => {
    const dx = x.get() + info.delta.x
    const dy = y.get() + info.delta.y

    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= radius) {
      x.set(dx)
      y.set(dy)
    } else {
      const angle = Math.atan2(dy, dx)
      const constrainedX = Math.cos(angle) * radius
      const constrainedY = Math.sin(angle) * radius

      x.set(constrainedX)
      y.set(constrainedY)
    }
  }

  const onPanEndHandler = () => {
    animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 })
    animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 })
  }

  return (
    <motion.div className={styles.root}>
      <motion.div
        className={styles.stick}
        onPan={onPanHandler}
        onPanEnd={onPanEndHandler}
        style={{ x, y }}
      >
        <Paw size={24} />
      </motion.div>
    </motion.div>
  )
}
