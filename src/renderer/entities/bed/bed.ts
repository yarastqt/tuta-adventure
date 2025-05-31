import { Physics, Scene } from 'phaser'

export class Bed extends Physics.Arcade.Sprite {
  declare body: Physics.Arcade.Body

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    super(scene, x, y, 'bed')

    scene.add.existing(this)
    scene.physics.add.existing(this, true)
  }
}
