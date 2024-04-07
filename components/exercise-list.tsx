'use client'

import { addExerciseToUser, removeExerciseFromUser } from '@/actions/exercises'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Exercise } from '@prisma/client'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader } from './loader'
import { Button, buttonVariants } from './ui/button'
import { Input } from './ui/input'

type Props = {
  title: string
  exercises: Exercise[]
  actionLabel: string
  actionHref: string
  itemActionButtonType: 'add' | 'remove'
  isLoading: boolean
}

export const ExerciseList: React.FC<Props> = ({
  exercises: initialExercises,
  title,
  actionHref,
  actionLabel,
  itemActionButtonType,
  isLoading,
}) => {
  const { userId } = useAuth()
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [searchQuery, setSearchQuery] = useState('')

  const handleClick = async (exerciseId: string) => {
    if (!userId) return

    if (itemActionButtonType === 'add') {
      const res = await addExerciseToUser(userId, exerciseId)

      if (res.error) return toast.error(res.message)

      if (res.success) return toast.success('Added Exercise')
    } else if (itemActionButtonType === 'remove') {
      const res = await removeExerciseFromUser(userId, exerciseId)

      if (res.success) {
        setExercises((prev) => prev && prev.filter((x) => x.id !== exerciseId))
        return toast.success('Removed Exercise')
      }
    }
  }

  const filteredExercises =
    (exercises.length > 0 &&
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
    []

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-2xl">{title}</h1>
        <Input
          type="search"
          placeholder="Search exercise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          className="max-w-[60%]"
        />
        <Link href={actionHref} className={cn(buttonVariants())}>
          <span>{actionLabel}</span>
        </Link>
      </div>
      {!isLoading ? (
        <div className="flex flex-col gap-8">
          {filteredExercises.length > 0 ? (
            <>
              {filteredExercises.map((exercise) => (
                <div
                  className="border rounded-md p-4 flex justify-between items-end"
                  key={exercise.id}
                >
                  <div className="space-y-4">
                    <Image
                      src={exercise.imagePath}
                      alt={exercise.name}
                      width={500}
                      height={125}
                      className="border w-auto h-auto"
                      priority
                    />
                    <p>{exercise.name}</p>
                  </div>
                  {itemActionButtonType === 'add' ? (
                    <Button onClick={() => handleClick(exercise.id)}>
                      <PlusIcon />
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={() => handleClick(exercise.id)}
                    >
                      <TrashIcon />
                    </Button>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className="text-center mt-8 text-lg">
              You don&apos;t have any exercises!
            </p>
          )}
        </div>
      ) : (
        <div className="flex justify-center pt-16">
          <Loader />
        </div>
      )}
    </div>
  )
}
