import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Page() {
  return redirect('/my-exercises')

  // return (
  // <div className="flex justify-center items-center h-full">
  //   <Link className={buttonVariants()} href="/my-exercises">
  //     My Exercises
  //   </Link>
  // </div>
  // )
}
