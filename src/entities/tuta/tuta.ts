import { Physics, Scene, type Types } from 'phaser'
import { invariant } from 'ts-invariant'

export class Tuta extends Physics.Arcade.Sprite {
  declare body: Physics.Arcade.Body

  private cursors: Types.Input.Keyboard.CursorKeys

  private velocity = 100

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    const graphics = scene.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0xff0000, 1)
    graphics.fillRect(0, 0, 36, 48)
    graphics.generateTexture('ghost', 36, 48)

    super(scene, x, y, 'ghost')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    invariant(scene.input.keyboard)

    this.cursors = scene.input.keyboard.createCursorKeys()

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

    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      const angle = Math.atan2(this.body.velocity.y, this.body.velocity.x) * (180 / Math.PI)

      this.setAngle(angle + 90)
    }
  }
}
