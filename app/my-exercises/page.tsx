'use client'
import { getExercisesByUser } from '@/actions/exercises'
import { ExerciseList } from '@/components/exercise-list'
import { useAuth } from '@clerk/nextjs'
import { Exercise } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const { userId } = useAuth()
  const [exercises, setExercises] = useState<Exercise[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      if (!userId) return
      setIsLoading(true)
      const res = await getExercisesByUser(userId)
      if (!res.success) return
      setExercises(res.data)
      setIsLoading(false)
    }
    run()
  }, [userId])

  return (
    <div className="container pt-8">
      {exercises && (
        <ExerciseList
          title="My Exercises"
          exercises={exercises || []}
          actionLabel="Add Exercise"
          actionHref="/exercises"
          itemActionButtonType="remove"
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
