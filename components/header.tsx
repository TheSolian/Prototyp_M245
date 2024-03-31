import { Loader } from '@/components/loader'
import {
  ClerkLoaded,
  ClerkLoading,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from '@clerk/nextjs'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

type Props = {}

export const Header: React.FC<Props> = ({}) => {
  const { sessionClaims } = auth()

  return (
    <div className="border-b-2 py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-3xl font-semibold">
        Prototype
      </Link>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className="flex justify-center items-center gap-4">
            <ul className="flex">
              <Link
                className={buttonVariants({ variant: 'link' })}
                href="/my-exercises"
              >
                My Exercises
              </Link>
              {sessionClaims?.metadata.role && (
                <Link
                  className={buttonVariants({ variant: 'link' })}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              )}
            </ul>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </ClerkLoaded>
    </div>
  )
}
