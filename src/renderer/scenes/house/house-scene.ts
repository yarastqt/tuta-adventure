import { scopeBind } from 'effector'
import { Display, GameObjects, Scene } from 'phaser'
import invariant from 'ts-invariant'

import { Bed } from '@app/entities/bed'
import { Bone } from '@app/entities/bone'
import { Radiola } from '@app/entities/radiola'
import { Tuta } from '@app/entities/tuta'
import { Achievement, AchievementModel } from '@app/shared/achievement'
import { Scenes } from '@app/shared/scenes'
import type { InteractionObject } from '@app/shared/system/interaction'
import { scope } from '@app/shared/system/scope'

export class HouseScene extends Scene {
  private tuta: Tuta
  private radiola: Radiola
  private bone: Bone
  private bed: Bed
  private interactionGroup: GameObjects.Group

  constructor() {
    super(Scenes.House)
  }

  create() {
    const house = this.make.tilemap({ key: 'house' })
    const tiles = house.addTilesetImage('tiles')

    invariant(tiles)

    const startPoint = house.getObjectLayer('start-point')
    const radiolaPoint = house.getObjectLayer('radiola-point')
    const bonePoint = house.getObjectLayer('bone-point')
    const bedPoint = house.getObjectLayer('bed-point')

    const floor = house.createLayer('floor', tiles, 0, 0)
    const walls = house.createLayer('walls', tiles, 0, 0)

    invariant(startPoint)
    invariant(radiolaPoint)
    invariant(bonePoint)
    invariant(bedPoint)
    invariant(walls)
    invariant(floor)

    walls.setCollisionByProperty({ isCollidable: true })

    this.bone = new Bone(this, bonePoint.objects[0].x, bonePoint.objects[0].y)
    this.tuta = new Tuta(this, startPoint.objects[0].x, startPoint.objects[0].y)
    this.radiola = new Radiola(this, radiolaPoint.objects[0].x, radiolaPoint.objects[0].y)
    this.bed = new Bed(this, bedPoint.objects[0].x, bedPoint.objects[0].y)

    this.interactionGroup = this.add.group([this.radiola, this.bone], { name: 'interaction-group' })

    this.physics.add.collider(this.tuta, walls)
    this.physics.add.collider(this.tuta, this.radiola)

    this.bone.onDrop(() => {
      if (this.physics.overlap(this.bone, this.bed)) {
        scopeBind(AchievementModel.achievementCompleted, { scope })(Achievement.HiddenBone)
      }
    })

    for (const object of this.interactionGroup.children.entries as InteractionObject[]) {
      this.physics.add.overlap(object.area, this.tuta, () => {
        this.tuta.setInteractionObject(object)
      })
    }

    this.cameras.main.setBounds(0, 0, house.widthInPixels, house.heightInPixels)
    this.cameras.main.setZoom(
      Math.max(this.scale.width / house.widthInPixels, this.scale.height / house.heightInPixels),
    )
    this.cameras.main.startFollow(this.tuta)

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
