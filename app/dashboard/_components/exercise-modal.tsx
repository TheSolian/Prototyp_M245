import { getExercisesByUser } from '@/actions/exercises'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Exercise } from '@prisma/client'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

type Props = {
  userId: string
}

export const ExerciseModal: React.FC<Props> = ({ userId }) => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const res = await getExercisesByUser(userId)

      if (!res.success) return

      if (res.data) {
        setExercises(res.data)
      }

      setIsLoading(false)
    }
    run()
  }, [userId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2">
          <EyeOpenIcon />
          <span>View Exercises</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%] h-[50%] grid grid-rows-[40px,1fr]">
        <DialogHeader>
          <DialogTitle>
            <span>{exercises.length}</span> Exercises
          </DialogTitle>
        </DialogHeader>
        {!isLoading ? (
          <>
            {exercises.length > 0 ? (
              <div className="overflow-y-scroll flex flex-col justify-start">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="text-lg odd:bg-gray-200 p-2"
                  >
                    {exercise.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="flex justify-center items-center">
                This user has no exercises!
              </p>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
