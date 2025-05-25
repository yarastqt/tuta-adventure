import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class PreloaderScene extends Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  preload() {
    this.load.setBaseURL('/')

    this.load.image('tiles', 'prototype/tiles.png')
    this.load.image('radiola', 'prototype/radiola.png')
    this.load.image('bone', 'prototype/bone.png')
    this.load.tilemapTiledJSON('house', 'prototype/house.json')
  }

  create() {
    this.scene.start(Scenes.House)
  }
}
