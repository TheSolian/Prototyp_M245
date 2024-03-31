'use client'

import { getExercises } from '@/actions/exercises'
import { ExerciseList } from '@/components/exercise-list'
import { Button } from '@/components/ui/button'
import { Exercise } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

export default function Page() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const res = await getExercises()

      if (!res.data) return

      setExercises(res.data)
      setIsLoading(false)
    }
    run()
  }, [])

  return (
    <div className="container pt-8">
      {exercises.length > 0 && (
        <ExerciseList
          title="Exercises"
          actionLabel="My Exercises"
          actionHref="/my-exercises"
          exercises={exercises}
          itemActionButtonType="add"
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
