import { GameObjects, type Scene } from 'phaser'

export interface InterfaceButtonOptions {
  name: string
  scene: Scene
  texture: string
  x: number
  y: number
  width: number
  height: number
}

export interface InterfaceButtonPressEvent {
  isPressed: boolean
  name: string
}

export enum InterfaceButtonEvent {
  PressChanged = 'interface.button.press-changed',
}

export class InterfaceButton extends GameObjects.Image {
  constructor(options: InterfaceButtonOptions) {
    super(options.scene, options.x, options.y, options.texture)

    this.setOrigin(1, 1)
    this.setDisplaySize(options.width, options.height)
    this.setInteractive()
    this.on('pointerdown', () => {
      options.scene.game.events.emit(InterfaceButtonEvent.PressChanged, {
        isPressed: true,
        name: options.name,
      })
    })
    this.on('pointerup', () => {
      options.scene.game.events.emit(InterfaceButtonEvent.PressChanged, {
        isPressed: false,
        name: options.name,
      })
    })

    if (import.meta.env.DEBUG) {
      options.scene.input.enableDebug(this)
    }
  }
}
