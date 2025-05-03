import type { FC } from 'react'

import { Paw } from '@app/shared/icons'
import { IconButton } from '@app/shared/ui'

import styles from './controls-screen.module.css'

export const ControlsScreen: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <IconButton shape="circled" onPress={() => null}>
          <Paw size={24} />
        </IconButton>
      </div>
    </div>
  )
}
