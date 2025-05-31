import { attach, createEvent, createStore, sample } from 'effector'

import { Achievement, achievements } from '../config/achievements'

const $achievements = createStore(
  achievements.map((achievement) => ({
    ...achievement,
    isCompleted: false,
  })),
)

const achievementCompleted = createEvent<Achievement>()

const completeAchievementFx = attach({
  source: $achievements,
  effect: (achievements, achievementId) => {
    return achievements.map((achievement) => ({
      ...achievement,
      isCompleted: achievement.id === achievementId ? true : achievement.isCompleted,
    }))
  },
})

sample({
  clock: achievementCompleted,
  target: completeAchievementFx,
})

sample({
  clock: completeAchievementFx.doneData,
  target: $achievements,
})

$achievements.watch(console.log)

export const AchievementModel = {
  $achievements,
  achievementCompleted,
}
