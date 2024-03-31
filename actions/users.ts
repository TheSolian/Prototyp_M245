'use server'

import { clerkClient } from '@clerk/nextjs/server'

export const getUsers = async () => {
  const sessions = await clerkClient.users.getUserList()

  const users = sessions.map((x) => {
    return {
      id: x.id,
      email: x.emailAddresses.map((y) => y.emailAddress)[0],
    }
  })

  return { success: true, data: users }
}
