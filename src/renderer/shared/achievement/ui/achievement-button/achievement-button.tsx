import { useUnit } from 'effector-react'
import type { FC } from 'react'

import { AchievementDialogModel } from '../../model/achievement-dialog-model'
import styles from './achievement-button.module.css'

export const AchievementButton: FC = () => {
  const { onOpenButtonPress } = useUnit({
    onOpenButtonPress: AchievementDialogModel.openButtonPressed,
  })

  return (
    <button className={styles.root} onClick={onOpenButtonPress}>
      A
    </button>
  )
}
