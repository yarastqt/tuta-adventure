export enum Achievement {
  HiddenBone = 1,
}

export interface AchievementItem {
  id: Achievement
  title: string
  description: string
}

export const achievements = [
  {
    id: Achievement.HiddenBone,
    title: 'Спрятать кость',
    description: 'Вы спрятали кость под кроватью',
  },
] satisfies AchievementItem[]
