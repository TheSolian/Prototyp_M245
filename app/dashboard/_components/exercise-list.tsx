'use client'

import { getExercises, getNumberOfUsersPerExercise } from '@/actions/exercises'
import { Loader } from '@/components/loader'
import { Exercise } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {}

export const ExerciseList: React.FC<Props> = ({}) => {
  const [exercises, setExercises] = useState<Exercise[]>()
  const [courses, setCourses] = useState<{ id: string; count: number }[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const res = await getExercises()

      if (!res.success) return
      if (res.data) {
        setExercises(res.data)
      }

      const numberOfUsers = await getNumberOfUsersPerExercise()

      if (!numberOfUsers.success) return
      if (numberOfUsers.data) {
        setCourses(numberOfUsers.data)
      }

      if (res.data && numberOfUsers.data) {
        setIsLoading(false)
      }
    }
    run()
  }, [])

  return (
    <>
      {!isLoading ? (
        <div className="space-y-4">
          {exercises &&
            exercises.map((exercise) => (
              <div
                className="border p-4 rounded-md flex justify-between items-center"
                key={exercise.id}
              >
                <div className="space-y-4 w-full">
                  <Image
                    src={exercise.imagePath}
                    alt={exercise.name}
                    width={500}
                    height={125}
                    className="border w-full h-auto"
                    priority
                  />
                  <div className="flex w-full justify-evenly">
                    <p>{exercise.name}</p>
                    <p>
                      Number of Users in Exercise:{' '}
                      {courses &&
                        courses.find((x) => x.id === exercise.id)?.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="pt-8">
          <Loader />
        </div>
      )}
    </>
  )
}
