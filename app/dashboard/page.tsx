import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { sessionClaims } = auth()

  if (sessionClaims?.metadata.role !== 'admin') {
    redirect('..')
  }

  return redirect('/dashboard/users')
}
