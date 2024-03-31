import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full">
      <Link className={buttonVariants()} href="/my-exercises">
        My Exercises
      </Link>
    </div>
  )
}
