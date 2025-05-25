import { Input, Physics, Scene } from 'phaser'
import { invariant } from 'ts-invariant'

import type { InteractionObject } from '@app/shared/system/interaction'

interface Controls {
  up: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  interact: Phaser.Input.Keyboard.Key
}

export class Tuta extends Physics.Arcade.Sprite {
  declare body: Physics.Arcade.Body

  private controls: Controls

  private velocity = 100

  private interactionObject: InteractionObject | null = null

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    const graphics = scene.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0xff0000, 1)
    graphics.fillRect(0, 0, 36, 48)
    graphics.generateTexture('ghost', 36, 48)

    super(scene, x, y, 'ghost')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    invariant(scene.input.keyboard)

    this.controls = {
      up: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
      left: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
      down: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S),
      right: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
      interact: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.E),
    }

    this.body.setSize(this.body.width * 1.2, this.body.height * 1.2)

    this.controls.interact.on('down', () => {
      this.interactionObject?.interact()
    })
  }

  preUpdate() {
    this.interactionObject = null
  }

  update() {
    this.body.setVelocity(0)

    if (this.controls.left.isDown) {
      this.body.setVelocityX(this.velocity * -1)
    } else if (this.controls.right.isDown) {
      this.body.setVelocityX(this.velocity)
    }

    if (this.controls.up.isDown) {
      this.body.setVelocityY(this.velocity * -1)
    } else if (this.controls.down.isDown) {
      this.body.setVelocityY(this.velocity)
    }

    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      const angle = Math.atan2(this.body.velocity.y, this.body.velocity.x) * (180 / Math.PI)

      this.setAngle(angle + 90)
    }
  }

  setInteractionObject(object: InteractionObject | null) {
    this.interactionObject = object
  }
}
