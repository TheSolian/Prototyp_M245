'use server'

import { db } from '@/prisma'

export const getExercises = async () => {
  const res = await db.exercise.findMany()
  return { success: true, data: res }
}

export const getExercisesByUser = async (userId: string) => {
  const res = await db.exerciseUser.findMany({
    where: {
      userId,
    },
    include: {
      exercise: true,
    },
  })

  const exercises = res.map((ex) => ex.exercise)

  return { success: true, data: exercises }
}

export const addExerciseToUser = async (userId: string, exerciseId: string) => {
  const existingExerciseUser = await db.exerciseUser.findFirst({
    where: {
      AND: [{ userId }, { exerciseId }],
    },
  })

  if (existingExerciseUser) {
    return { error: true, message: "You've already added this exercise!" }
  }

  await db.exerciseUser.create({
    data: {
      userId,
      exerciseId: exerciseId,
    },
  })

  return { success: true, data: null }
}

export const removeExerciseFromUser = async (
  userId: string,
  exerciseId: string
) => {
  await db.exerciseUser.deleteMany({
    where: {
      AND: [{ userId }, { exerciseId }],
    },
  })

  return { success: true, data: null }
}

export const getNumberOfUsersPerExercise = async () => {
  const res = await db.exerciseUser.findMany()

  const numberOfUsers: { id: string; count: number }[] = Object.values(
    res.reduce((acc, curr) => {
      if (acc[curr.exerciseId]) {
        acc[curr.exerciseId].count++
      } else {
        acc[curr.exerciseId] = { id: curr.exerciseId, count: 1 }
      }
      return acc
    }, {} as Record<string, { id: string; count: number }>)
  )

  return { success: true, data: numberOfUsers }
}
