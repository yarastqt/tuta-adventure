import { Physics, Scene, type Types } from 'phaser'
import { invariant } from 'ts-invariant'

export class Tuta extends Physics.Arcade.Sprite {
  body: Physics.Arcade.Body

  private cursors: Types.Input.Keyboard.CursorKeys

  private velocity = 100

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    const graphics = scene.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0xff0000, 1)
    graphics.fillRect(0, 0, 36, 48)
    graphics.generateTexture('ghost', 36, 48)

    super(scene, x, y, 'ghost')

    invariant(scene.input.keyboard)

    this.cursors = scene.input.keyboard.createCursorKeys()
    this.body = scene.physics.add.image(x, y, 'ghost').body

    this.body.setSize(this.body.width * 1.2, this.body.height * 1.2)
  }

  update() {
    this.body.setVelocity(0)

    if (this.cursors.left.isDown) {
      this.body.setVelocityX(this.velocity * -1)
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity)
    }

    if (this.cursors.up.isDown) {
      this.body.setVelocityY(this.velocity * -1)
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity)
    }
  }
}
