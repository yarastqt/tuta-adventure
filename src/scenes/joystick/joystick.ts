import { type GameObjects, type Input, Math as PhaserMath, Scene, type Tweens } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class JoystickScene extends Scene {
  private container!: GameObjects.Container
  private thumb!: GameObjects.Image
  private stick!: GameObjects.Image

  private tween: Tweens.Tween | null

  private pointer: Input.Pointer | null
  private isPressed: boolean

  constructor() {
    super(Scenes.Joystick)
  }

  create() {
    this.container = this.add.container(96, this.cameras.main.height - 96)

    this.thumb = this.add.image(0, 0, 'thumb')
    this.thumb.setDisplaySize(128, 128)

    this.stick = this.add.image(0, 0, 'stick')
    this.stick.setDisplaySize(56, 56)

    this.container.add([this.thumb, this.stick])
    this.container.setScrollFactor(0, 0)
    this.container.setAlpha(0)

    this.attachEvents()
  }

  private attachEvents() {
    this.input.on('pointerdown', this.onPointerDown, this)
    this.input.on('pointermove', this.onPointerMove, this)
    this.input.on('pointerup', this.onPointerUp, this)
    this.input.on('pointerupoutside', this.onPointerUp, this)
  }

  private onPointerDown(pointer: Input.Pointer) {
    if (this.isPressed) {
      return
    }

    this.tween?.destroy()

    this.pointer = pointer
    this.isPressed = true

    this.updateController(pointer)
    this.container.setAlpha(1)
  }

  private onPointerMove(pointer: Input.Pointer) {
    if (this.isPressed && this.pointer && this.pointer.id === pointer.id) {
      this.updateController(pointer)
    }
  }

  private onPointerUp(pointer: Input.Pointer) {
    if (this.isPressed && this.pointer && this.pointer.id === pointer.id) {
      this.pointer = null
      this.isPressed = false

      this.tween = this.tweens.add({
        targets: this.stick,
        x: 0,
        y: 0,
        duration: 200,
        ease: PhaserMath.Easing.Bounce.Out,
      })

      this.tweens.add({
        targets: this.container,
        alpha: 0,
        duration: 200,
        ease: PhaserMath.Easing.Linear,
      })
    }
  }

  private updateController(pointer: Input.Pointer) {
    const dx = pointer.x - this.container.x
    const dy = pointer.y - this.container.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)

    let stickDistance = distance

    if (distance > this.thumb.displayWidth / 2) {
      stickDistance = this.thumb.displayWidth / 2
    }

    this.stick.x = stickDistance * Math.cos(angle)
    this.stick.y = stickDistance * Math.sin(angle)
  }
}
