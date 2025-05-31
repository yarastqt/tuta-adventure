import { attach, createEffect, createEvent, createStore, sample } from 'effector'

import { Achievement, type AchievementItem, achievements } from '../config/achievements'

const $achievements = createStore(
  achievements.map((achievement) => ({
    ...achievement,
    isCompleted: false,
  })),
)

const $isShown = createStore(false)
const $completedAchievement = createStore<AchievementItem | null>(null)

const achievementCompleted = createEvent<Achievement>()
const achievementPressed = createEvent()

const completeAchievementFx = attach({
  source: $achievements,
  effect: (achievements, achievementId) => {
    return achievements.map((achievement) => ({
      ...achievement,
      isCompleted: achievement.id === achievementId ? true : achievement.isCompleted,
    }))
  },
})

const hideAchievementFx = createEffect(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
})

sample({
  clock: achievementCompleted,
  target: completeAchievementFx,
})

sample({
  clock: achievementCompleted,
  fn: (achievementId) =>
    achievements.find((achievement) => achievement.id === achievementId) ?? null,
  target: $completedAchievement,
})

sample({
  clock: achievementCompleted,
  fn: () => true,
  target: [$isShown, hideAchievementFx],
})

sample({
  clock: completeAchievementFx.doneData,
  target: $achievements,
})

sample({
  clock: hideAchievementFx.doneData,
  target: $isShown.reinit,
})

export const AchievementModel = {
  $achievements,
  $completedAchievement,
  $isShown,
  achievementCompleted,
  achievementPressed,
}
