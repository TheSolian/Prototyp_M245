'use client'

import { getUsers } from '@/actions/users'
import { Loader } from '@/components/loader'
import { useEffect, useState } from 'react'
import { ExerciseModal } from './exercise-modal'

type Props = {}

export const UserList: React.FC<Props> = ({}) => {
  const [users, setUsers] = useState<{ id: string; email: string }[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const res = await getUsers()

      console.log(res)

      if (!res.success) return

      if (res.data) {
        setUsers(res.data)
        setIsLoading(false)
      }
    }
    run()
  }, [])

  return (
    <>
      {!isLoading ? (
        <div className="space-y-4">
          {users &&
            users.map((user) => (
              <div
                className="border p-4 rounded-md flex justify-between items-center"
                key={user.id}
              >
                <div>{user.email}</div>
                <ExerciseModal userId={user.id} />
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
