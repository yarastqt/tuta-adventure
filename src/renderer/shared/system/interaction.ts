import type { GameObjects } from 'phaser'

export interface InteractionObject extends GameObjects.GameObject {
  area: GameObjects.Zone
  anchor: GameObjects.GameObject | null

  interact?(): void
  pickup?(anchor: GameObjects.GameObject): void
  drop?: () => void
}
