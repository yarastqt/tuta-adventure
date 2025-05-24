import type { GameObjects } from 'phaser'

export interface InteractionObject extends GameObjects.GameObject {
  area: GameObjects.Zone
  interact(): void
}
