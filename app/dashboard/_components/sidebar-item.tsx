'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  href: string
  label: string
}

export const SidebarItem: React.FC<Props> = ({ href, label }) => {
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'link' }),
        'justify-start px-4 max-w-32 hover:bg-blue-500/10',
        {
          'bg-blue-500/30': pathname == href,
        }
      )}
      href={href}
    >
      {label}
    </Link>
  )
}
