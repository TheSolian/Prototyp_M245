import { SidebarItem } from './_components/sidebar-item'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-4 pt-8 grid grid-cols-[250px,60%]">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-1">
          <SidebarItem href="/dashboard/users" label="Users" />
          <SidebarItem href="/dashboard/exercises" label="Exercises" />
        </div>
      </div>
      <div className="pt-8">{children}</div>
    </div>
  )
}
