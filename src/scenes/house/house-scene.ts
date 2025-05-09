import { Display, Scene } from 'phaser'
import invariant from 'ts-invariant'

import { Tuta } from '@app/entities/tuta'
import { Scenes } from '@app/shared/scenes'

export class HouseScene extends Scene {
  tuta: Tuta

  constructor() {
    super(Scenes.House)
  }

  create() {
    const house = this.make.tilemap({ key: 'house' })
    const tiles = house.addTilesetImage('tiles')

    invariant(tiles)

    const startPoint = house.getObjectLayer('start-point')

    const floor = house.createLayer('floor', tiles, 0, 0)
    const walls = house.createLayer('walls', tiles, 0, 0)

    invariant(startPoint)
    invariant(walls)
    invariant(floor)

    walls.setCollisionByProperty({ isCollidable: true })

    this.tuta = new Tuta(this, startPoint.objects[0].x, startPoint.objects[0].y)

    this.physics.add.collider(this.tuta, walls)

    this.cameras.main.setBounds(0, 0, house.widthInPixels, house.heightInPixels)
    this.cameras.main.setZoom(
      Math.max(this.scale.width / house.widthInPixels, this.scale.height / house.heightInPixels),
    )
    this.cameras.main.startFollow(this.tuta)
    this.cameras.main.setRoundPixels(true)

    walls.renderDebug(this.add.graphics(), {
      collidingTileColor: new Display.Color(243, 134, 48, 200),
      faceColor: new Display.Color(40, 39, 37, 255),
      tileColor: null,
    })
  }

  update() {
    this.tuta.update()
  }
}
